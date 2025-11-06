// Import necessary modules
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// Allow your frontend to access this server
app.use(cors());

// Main proxy endpoint
// Example: /proxy?target=https://example.com
app.get("/proxy", async (req, res) => {
  const target = req.query.target;
  if (!target) return res.status(400).send("Missing ?target=");

  try {
    // Fetch the target website's HTML
    const response = await fetch(target);
    const body = await response.text();
    res.send(body);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching target URL");
  }
});

// Replit sets PORT automatically, fallback to 3000 if missing
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Unblockify proxy running on port ${PORT}`));
