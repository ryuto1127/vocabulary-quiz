// pages/api/generateQuestions.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}); // Outputs 'GET', 'POST', etc.


export default async function handler(req, res) {
    console.log(req.method);
  if (req.method === 'GET') {
    const { level } = req.query; // Extract 'level' from query parameters

    if (!level) {
      return res.status(400).json({ error: 'Level is required.' });
    }

    const prompt = `
      Generate 10 multiple-choice vocabulary questions for an English learner at the ${level} level.
      Each question should be in JSON format like this:
      {
        "word": "example",
        "options": ["option1", "option2", "option3", "option4"],
        "correct": "correct answer",
        "definition": "definition",
        "example": "example sentence"
      }
    `;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const responseText = completion.choices[0].message.content.trim();
      console.log("OpenAI Response:", responseText);

      try {
        const questions = JSON.parse(responseText);
        res.status(200).json({ questions });
      } catch (parseError) {
        console.error("Failed to parse AI response as JSON:", parseError);
        res.status(500).json({ error: "Failed to parse AI response as JSON." });
      }

    } catch (error) {
    console.error("Error in /api/generateQuestions:", error.response ? error.response.data : error.message);
      res.status(500).json({ error: "An error occurred while generating questions." });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}