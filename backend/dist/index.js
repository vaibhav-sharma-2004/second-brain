"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const zod_1 = require("zod");
const middleware_1 = require("./middleware");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
//signup route
app.post('/api/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    //zod validation
    const userSchema = zod_1.z.object({
        username: zod_1.z.string().min(3).max(20),
        password: zod_1.z.string().min(6).max(20),
        email: zod_1.z.string().email(),
    });
    const validation = userSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.errors });
    }
    // Save the new user to the database
    yield db_1.userModel.create({
        username,
        password,
        email,
    });
    // Send a success response
    res.status(201).json({ message: 'User created successfully' });
}));
//signin route
app.post('/api/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    // Find the user in the database
    const user = yield db_1.userModel.findOne({ username, password, email });
    if (!user) {
        res.status(401).json({ message: 'Invalid username or password' });
    }
    else {
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, config_1.JWT_SECRET);
        // Send the token back to the client
        res.json({ token });
    }
}));
app.post('/api/content', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type } = req.body;
    yield db_1.contentModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
}));
app.get('/api/content', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId; // get the user id from the token
    const content = yield db_1.contentModel.find({
        //@ts-ignore
        userId: userId, // get the user id from the token
    }).populate("userId", "username");
    res.status(200).json(content);
}));
app.delete('/api/content', (req, res) => {
});
app.post('/api/brain/share', (req, res) => {
});
app.get('/api/brain/:shareLink', (req, res) => {
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
