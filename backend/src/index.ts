import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { contentModel, userModel } from './db';
import { z } from 'zod';
import { authMiddleware } from './middleware';
import { JWT_SECRET } from './config';

const app = express();
app.use(express.json());

//signup route
app.post('/api/signup',async (req, res)=>{

    const { username, password, email } = req.body;

    //zod validation
    const userSchema = z.object({
        username: z.string().min(3).max(20),
        password: z.string().min(6).max(20),
        email: z.string().email(),
    });

    const validation = userSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.errors });
    }

    // Save the new user to the database
    await userModel.create({
        username,
        password,
        email,
    });
    // Send a success response
    res.status(201).json({ message: 'User created successfully' });
});

//signin route
app.post('/api/signin', async (req, res)=>{

    const { username, password ,email} = req.body;

    // Find the user in the database
    const user = await userModel.findOne({ username, password ,email });
    if (!user) {
         res.status(401).json({ message: 'Invalid username or password' });
    }
    else{
        // Generate a JWT token
        const token = jwt.sign({ 
            id: user._id
        }, JWT_SECRET)

        // Send the token back to the client
        res.json({ token });
    }
})


app.post('/api/content',authMiddleware, async (req, res) => {// add a middleware to get the user id from the token

    const { link, type } = req.body;
    await contentModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })

})

app.get('/api/content',authMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId; // get the user id from the token

    const content= await contentModel.find({
        //@ts-ignore
        userId:userId, // get the user id from the token

    }).populate("userId", "username")

    res.status(200).json(content);


})

app.delete('/api/content', async (req, res) => {
     const contentId = req.body.contentId;

     await contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
     })

     res.json({
        message: "Content deleted"
     })
})

app.post('/api/brain/share', (req, res) => {
})

app.get('/api/brain/:shareLink', (req, res) => {
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})