"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentModel = exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const config_1 = require("./config");
mongoose_2.default.connect(config_1.MONGO_URL);
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});
exports.userModel = (0, mongoose_1.model)('User', userSchema);
const contentSchema = new mongoose_1.Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose_2.default.Types.ObjectId, ref: 'Tag' }],
    type: String,
    userId: { type: mongoose_2.default.Types.ObjectId, ref: 'User', required: true },
});
exports.contentModel = (0, mongoose_1.model)('Content', contentSchema);
