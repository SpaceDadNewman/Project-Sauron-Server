import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { OpenAIApi, Configuration } from 'openai';

const OPENAI_API_KEY = 'FN5v5ldbtyZQKPhznjftT3BlbkFJRrFuDq6TbhvlP54sfTj7';

// Define your OpenAI instance
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

// Function to list files using OpenAI API
async function listFiles() {
  const list = await openai.files.list();

  for await (const file of list) {
    console.log(file);
  }
}

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  // Handle incoming frames from the app
  ws.on('message', (message) => {
    const frameData = Buffer.from(message, 'base64');
    // Processing frame data

    axios.post(apiUrl, { frames: frameData }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      const analysisResults = response.data;
      // Handle analysis results

      // WebSocket connection
      ws.send(JSON.stringify({ type: 'analysis', data: analysisResults }));

      // Call the function to list files using OpenAI API
      listFiles();
    })
    .catch((error) => {
      console.error(error);
    });
  });

  // Handle WebSocket disconnections
  ws.on('close', (code, reason) => {
    console.log(`WebSocket connection closed. Code: ${code}, Reason: ${reason}`);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
