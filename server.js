const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const path = require('path');

const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(express.static('public'));
app.use(express.json());

app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const result = await model.generateContent(prompt);
        res.json({ response: result.response.text() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});