
import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv'
dotenv.config();
 

// const TOKEN = "eb1ec6d0f8d9945ae3bc277ecfd6da8f";
// const ENDPOINT="https://send.api.mailtrap.io"

export const mailtrapclient = new MailtrapClient({
  endpoint:process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "kusha",
};

