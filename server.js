const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

// 🔒 Allow only your extension and trusted sites
const allowedOrigins = [
  'chrome-extension://hoeehbebhmfakndlhlpeghjenpbpebla
  'https://chatgpt.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" folder
app.use(express.static('public'));

// WebSocket logic
io.on('connection', (socket) => {
  console.log('🟢 A client connected:', socket.id);

  socket.on('chat_message', (data) => {
    console.log(`📨 Relaying message from ${data.username}: ${data.message}`);
    io.emit('chat_message', data); // Relay to all (Chrome extension listens)
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
