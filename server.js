// Import the libraries we'll use
// "express" makes it easy to handle web requests
// "cors" lets your proxy be accessed from other websites
// "node-fetch" lets us fetch pages from other websites
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

// Create an Express app
const app = express();

// Allow requests from any website (important for your frontend)
app.use(cors());

// This is the main proxy route
// When someone goes to: /proxy?target=https://example.com
// the server will fetch that site and send the content back
app.get("/proxy", async (req, res) => {
  // Get the "target" URL from the query string (?target=...)
  const target = req.query.target;

  // If no target is given, show an error
  if (!target) return res.status(400).send("Missing ?target=");

  try {
    // Fetch the target website
    const response = await fetch(target);

    // Get the page content as text (HTML)
    const body = await response.text();

    // Send that content back to whoever requested it
    res.send(body);
  } catch (err) {
    // If something goes wrong (like invalid URL), log it and show an error
    console.error(err);
    res.status(500).send("Error fetching target URL");
  }
});

// Railway gives your app a random port number using an environment variable
// We tell Express to listen on that port (or 3000 if local)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Unblockify proxy running on port ${PORT}`));
