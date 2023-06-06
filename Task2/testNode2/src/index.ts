import express from 'express';
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from './routes/auth'
import { StartMongooseServer } from './services/mongoose';
dotenv.config()
const app = express();

// Enable CORS for all routes
app.use(cors());

/**mount middleware to Authentication and Authorization */
app.use("/auth", authRoutes)

//start the mongoose server

StartMongooseServer()


// Start the server
const port = process.env.PORT||3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});