import { WebSocketServer } from "ws";
import ollama from "ollama";

const wss = new WebSocketServer({ port: 3000 });

console.log("WebSocket server is running on ws://localhost:3000");

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (message) => {
    console.log("Received:", message.toString());

    try {
      // Query Ollama with the received message
      const response = await ollama.chat({
        model: "deepseek-r1",
        messages: [{ role: "user", content: message.toString() }],
      });

      // Extract only the actual content after the think tags
      const cleanResponse = response.message.content
        .split("</think>")
        .pop() // Get everything after the last </think> tag
        .replace(/<[^>]*>/g, "") // Remove any remaining HTML-like tags
        .trim();

      // If the cleaned response is empty, send the original response
      ws.send(cleanResponse || response.message.content);
    } catch (err) {
      console.error("Error querying Ollama:", err);
      ws.send("Sorry, I encountered an error processing your request.");
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
