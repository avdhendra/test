"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const register = async (req, res) => {
    try {
        const { email, password, confirm, role } = req.body;
        const user = await User_1.default.find({ email: email });
        if (user) {
            res.status(409).json({ msg: "User Already Registered" });
        }
        else {
            const salt = await bcrypt_1.default.genSalt();
            const passwordHash = await bcrypt_1.default.hash(password.toString(), salt.toString());
            const newUser = new User_1.default({
                email,
                confirmPassword: confirm,
                role,
                password: passwordHash,
            });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: 'User Does not exist' });
        }
        const isMatch = await bcrypt_1.default.compare(password.toString(), user.password.toString());
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.login = login;
