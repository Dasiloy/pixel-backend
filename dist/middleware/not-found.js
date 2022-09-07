"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const notFoundMiddleware = (_req, res) => res
    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
    .json({ message: "Not Found" });
exports.notFoundMiddleware = notFoundMiddleware;
