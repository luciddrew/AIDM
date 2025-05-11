const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

// 🔒 Allow only your extension and trusted sites
const allowedOrigins = [
  'chrome-extension://hoeehbebhmfakndlhlpeghjenpbpebla', // ← Replace with your real extension ID
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

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chat_message', (data) => {
    console.log(`Message from ${data.username}: ${data.message}`);
    io.emit('chat_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
