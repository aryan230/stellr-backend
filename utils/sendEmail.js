import Mailgun from "mailgun.js";
import FormData from "form-data";

const mailgun = new Mailgun(FormData);
const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendEmail = (email, subject, html) => {
  const messageData = {
    from: "Excited User <me@getstellr.io>",
    to: email,
    subject: subject,
    html: html,
  };

  client.messages
    .create("getstellr.io", messageData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};

export default sendEmail;
