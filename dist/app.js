"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_service_1 = require("./services/logger.service");
const connect_db_1 = require("./connect.db");
const not_found_1 = require("./middleware/not-found");
const error_handler_1 = require("./middleware/error-handler");
require("express-async-errors");
//routers imports
const test_1 = __importDefault(require("./test"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("static"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
//routers
app.use("/test", test_1.default);
// errors middlewares
app.use(not_found_1.notFoundMiddleware);
app.use(error_handler_1.errorHandlerMiddleware);
const startServer = async () => {
    const PORT = process.env.PORT || 5000;
    const logger = logger_service_1.Logger.getInstance();
    logger.log("Starting server...");
    try {
        await (0, connect_db_1.connectDB)(process.env.MONGO_URI);
        app.listen(PORT, () => {
            logger.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        logger.error(error);
    }
};
startServer();
