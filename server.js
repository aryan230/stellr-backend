import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import sampleRoutes from "./routes/sampleRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import deliveryAdressRoutes from "./routes/deliveryAdressRoutes.js";
import cors from "cors";
import path from "path";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import Razorpay from "razorpay";
import Stripe from "stripe";
import passport from "passport";
import cookieSession from "cookie-session";
import sgMail from "@sendgrid/mail";
import couponRoutes from "./routes/couponsRoutes.js";
import firebaseRoutes from "./routes/firebaseRoutes.js";
import entryRoutes from "./routes/EntryRoutes.js";
import firebaseConfig from "./config/firebase.js";
import entryTemplateRoutes from "./routes/entryTemplateRoutes.js";
import { Server } from "socket.io";
import http from "http";
import Entry from "./models/EntryModel.js";

const stripe = new Stripe(
  "sk_test_51MHPaRSGajuPx50dAJ7Y0JCA3PhfRiaMhWCpRUUKlCtos4sNQwsoU6vUfmmvgu3rZjed8Um8LgJl2JezunYyIvev009DR0aSRg"
);

dotenv.config();
connectDB();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.use(cors());
app.use(express.json());
// ** MIDDLEWARE **
// const whitelist = [
//   "http://localhost:3000",
//   "http://localhost:8080",
//   "https://thehonestcareerco.in",
//   "https://beta.thehonestcareerco.in",
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin);
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable");
//       callback(null, true);
//     } else {
//       console.log("Origin rejected");
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// app.use(cors(corsOptions));

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    console.log(documentId);
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data[0].block);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      console.log(data);
      const entry = await Entry.findById(documentId);
      entry.data = [
        {
          user: data.user,
          block: data.data,
          date: Date.now(),
        },
      ];
      const updatedEntry = await entry.save();
    });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;
  const document = await Entry.findById(id);
  if (document) return document;
}

app.use("/api/users", userRoutes);
app.use("/api/upload", firebaseRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/entries", entryRoutes);
app.use("/api/entry/templates", entryTemplateRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/samples", sampleRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/delivery", deliveryAdressRoutes);
app.use("/api/coupons", couponRoutes);
app.get("/api/sendEmail", (req, res) => {
  const msg = {
    to: "gabru2306@gmail.com", // Change to your recipient
    from: "aryan@thehonestcareerco.in",
    dynamic_template_data: {
      name: "Aryan",
      id: "123",
    },
    // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    template_id: "d-5888185181df49bd8485dc6cdfebbd87",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.send("Message sent");
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/api/config/stripe", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
});

app.get("/people", (req, res) =>
  res.json({
    success: true,
    items: [
      {
        profile_photo: "http://placehold.it/300x200",
        name: "John Doe",
      },
      {
        href: "http://placehold.it/300x200",
        name: "Jane Doe",
      },
    ],
  })
);

app.get("/api/config/razorpay", (req, res) =>
  res.send(process.env.RAZORPAY_KEY_ID)
);

app.post("/api/create-order", async (req, res) => {
  const { amount, receipt } = req.body;
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: amount + "00",
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    if (order) {
      res.send(order);
    } else {
      res.status(500);
      res.send("There was some error");
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 3002;
server.listen(PORT, console.log(`Server running on port ${PORT}`));
