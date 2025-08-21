export default async function handler(req, res) {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "No prompt" });

  try {
    const response = await fetch("https://muse-ai-server.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    res.status(200).json({ response: data.response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to contact Render AI" });
  }
}
