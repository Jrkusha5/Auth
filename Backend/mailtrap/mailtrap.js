// Looking to send emails in production? Check out our Email API/SMTP product!
 import { MailtrapClient } from "mailtrap";
 import dotenv from "dotenv";

 dotenv.config();


export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
  testInboxId: 3181209,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Kusha",
};
