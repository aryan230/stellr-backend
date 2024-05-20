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
import reportRoutes from "./routes/reportRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import sopRoutes from "./routes/sopRoutes.js";
import protocolRoutes from "./routes/protocolRoutes.js";
import firebaseConfig from "./config/firebase.js";
import entryTemplateRoutes from "./routes/entryTemplateRoutes.js";
import fieldRoutes from "./routes/fieldRoutes.js";
import sampleTemplateRoutes from "./routes/sampleTemplateRoutes.js";
import { Server } from "socket.io";
import http from "http";
import Entry from "./models/EntryModel.js";
import organizationRoutes from "./routes/organizationRoutes.js";
import axios from "axios";
import FormData from "form-data";
import Mailgun from "mailgun.js";
import chemicalDrawingRoutes from "./routes/chemicalDrawingRoutes.js";
import orgRolesRoutes from "./routes/orgRolesRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import Notification from "./models/notificationModel.js";
const stripe = new Stripe(
  "sk_test_51MHPaRSGajuPx50dAJ7Y0JCA3PhfRiaMhWCpRUUKlCtos4sNQwsoU6vUfmmvgu3rZjed8Um8LgJl2JezunYyIvev009DR0aSRg"
);

dotenv.config();
connectDB();
const mailgun = new Mailgun(FormData);
export const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  maxHttpBufferSize: 1e8,
  cors: {
    origin: [
      "http://localhost:3000",
      "https://stellr-app.vercel.app",
      "https://app.getstellr.io",
      "https://staging.getstellr.io",
    ],
    methods: ["GET", "POST"],
  },
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
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
  // Notifications Start

  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("send-message", (message) => {
    socket.to(message.id).emit("receive-message", message);
  });

  // Notifications End

  socket.on("get-document", async ({ documentId }) => {
    const document = await findOrCreateDocument(documentId);

    socket.join(documentId);

    socket.on("joinLobby", (user) => {
      console.log(user);
      socket.user = user;
      // Store user's name in a data structure or database
      // Broadcast to other clients in the lobby
      socket.broadcast.to(documentId).emit("userJoined", user);
    });

    socket.on("disconnect", () => {
      const user = socket.user;
      socket.broadcast.to(documentId).emit("userLeft", user);
    });

    socket.emit("load-document", {
      document: document.data[0].block,
    });

    socket.on("send-changes", (delta) => {
      console.log(delta.ops);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Entry.findByIdAndUpdate(documentId, {
        data: {
          user: data.user,
          block: data.data,
          date: Date.now(),
        },
      });

      // entry.data = [,];
      // const updatedEntry = await entry.save();
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
app.use("/api/organs", organizationRoutes);
app.use("/api/entries", entryRoutes);
app.use("/api/entry/templates", entryTemplateRoutes);
app.use("/api/fields", fieldRoutes);
app.use("/api/sampleTemplates", sampleTemplateRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/samples", sampleRoutes);
app.use("/api/protocols", protocolRoutes);
app.use("/api/sops", sopRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/delivery", deliveryAdressRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashboards", dashboardRoutes);
app.use("/api/cd", chemicalDrawingRoutes);
app.use("/api/orgRole", orgRolesRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/link", linkRoutes);
// app.get("/api/sendEmail", (req, res) => {
//   const msg = {
//     to: "gabru2306@gmail.com", // Change to your recipient
//     from: "aryan@thehonestcareerco.in",
//     dynamic_template_data: {
//       name: "Aryan",
//       id: "123",
//     },
//     // Change to your verified sender
//     subject: "Sending with SendGrid is Fun",
//     template_id: "d-5888185181df49bd8485dc6cdfebbd87",
//     text: "and easy to do anywhere, even with Node.js",
//     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//   };
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log("Email sent");
//       res.send("Message sent");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

app.get("/api/sendEmail", async (req, res) => {
  const messageData = {
    from: "Excited User <me@getstellr.io>",
    to: "aryan.a@futurecloud.in",
    subject: "Hello",
    text: "Testing some Mailgun awesomeness!",
  };

  client.messages
    .create("getstellr.io", messageData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/api/config/openai", (req, res) => {
  res.send({
    apikey: process.env.OPEN_API_KEY,
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
