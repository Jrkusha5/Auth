
 import { MailtrapClient } from "mailtrap";
 import dotenv from "dotenv";

 dotenv.config();


export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
  testInboxId: 3181209,
});

export const sender = {
  email: "jrkusha5@gmail.com",
  name: "Kusha",
};
