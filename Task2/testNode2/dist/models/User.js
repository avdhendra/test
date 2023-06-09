"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    confirmPassword: {
        type: String,
        required: true,
        min: 5,
    },
    role: {
        type: String,
        require: true,
    }
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
