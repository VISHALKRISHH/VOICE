const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fetch = require("node-fetch");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = "https://api.groq.com/openai/v1/chat/completions";

app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
