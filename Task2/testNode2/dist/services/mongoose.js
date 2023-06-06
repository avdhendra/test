"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartMongooseServer = void 0;
/** Mongoose Setup **/
const mongoose_1 = __importDefault(require("mongoose"));
function StartMongooseServer() {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default.connect(process.env.MONGO_URL, connectionParams)
        .then(() => {
        console.log(">> MongoDB Online");
    })
        .catch((error) => console.log(`${error} did not connect`));
}
exports.StartMongooseServer = StartMongooseServer;
