import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';

import NoteRouter from "./route/noteRoute.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json({limit: '10mb'}));
app.use(rateLimiter);


app.use("/api/notes", NoteRouter);

if(process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get("*", (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, 'frontend',"dist", 'index.html'))
    }
  })
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});