// backend/server.js
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL_NAME });

app.post('/api/gemini', async (req, res) => {
  const { messages } = req.body; // Correctly access the messages property

  console.log("Request received at /api/gemini with message history");

  try {
    const prompt = messages.map(m => `${m.sender}: ${m.text}`).join('\n'); // Format messages for prompt
    const fullPrompt = `You are MindConnect, an AI therapist bot designed to provide mental health support.  Please remember that you are an AI and cannot provide professional medical advice.  If the user mentions anything related to self-harm, suicide, or other serious mental health issues, gently advise them to seek help from a qualified mental health professional.  Here's the conversation history:\n${prompt}`;
    console.log(fullPrompt);
    const result = await model.generateContent(fullPrompt);
    console.log("linebreak");

    console.log("Gemini API call successful");
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Error calling Gemini API' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});