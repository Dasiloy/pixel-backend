import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { Logger } from "./services/logger.service";
import { connectDB } from "./connect.db";
import { notFoundMiddleware } from "./middleware/not-found";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import "express-async-errors";

//routers imports
import testRouter from "./test";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routers
app.use("/test", testRouter);

// errors middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  const logger = Logger.getInstance();
  logger.log("Starting server...");
  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(PORT, () => {
      logger.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(error);
  }
};

startServer();
