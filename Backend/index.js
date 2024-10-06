import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

import authRoutes from "./routes/authRoutes.js"

dotenv.config()

const uri = process.env.MONGO_URI;  // Make sure your connection string is stored in an environment variable

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


const app = express()

const PORT= process.env.PORT|| 6000;

app.use(express.json());


app.use("/api/auth", authRoutes);

app.listen(PORT, ()=>{
   
    console.log("server is running on port:", PORT)
})
//
