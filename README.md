# Free Chat Assistant

This project is created to help you chat with the deepseek ai using a local ollama server with deep-seek model. This is a simple chat application that you can use to chat with the deepseek ai. This project is created using React, TailwindCSS, Lucide Icons, and WebSocket. This project is developed in bolt.new site.

## How to use

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Run `node server.js`
5. Open the application in your browser at localhost:5173

## Using Ollama

- https://ollama.com/download/mac

## How to run DeepSeek model

- open terminal 
- ensure that the ollama is installed
- Run `ollama run deepseek-r1` (or any other model)

## How to use the local server in js

- import ollama from "ollama";
- const response = await ollama.chat({
  model: "deepseek-r1",
  messages: [{ role: "user", content: message.toString() }],
});


## Note:
- Try using cursor for coding, it's a game changer for AI developer.

![Screenshot 2025-02-02 at 1 46 31 PM](https://github.com/user-attachments/assets/36278a9e-6c51-48ab-a499-1128d7520d32)
