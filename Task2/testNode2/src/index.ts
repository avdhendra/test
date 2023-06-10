import express from 'express';
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from './routes/auth'
import morgan from "morgan"
import { StartMongooseServer } from './services/mongoose';
import bodyParser from 'body-parser';

dotenv.config()
const app = express();
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// Enable CORS for all routes
app.use(cors());
app.use(morgan('combined'))
/**mount middleware to Authentication and Authorization */
app.use("/auth", authRoutes)


//start the mongoose server

StartMongooseServer()


// Start the server
const port = process.env.PORT||3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});