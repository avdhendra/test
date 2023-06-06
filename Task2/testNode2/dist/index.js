"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const mongoose_1 = require("./services/mongoose");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Enable CORS for all routes
app.use((0, cors_1.default)());
/**mount middleware to Authentication and Authorization */
app.use("/auth", auth_1.default);
//start the mongoose server
(0, mongoose_1.StartMongooseServer)();
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
