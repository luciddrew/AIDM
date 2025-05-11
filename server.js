const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

// 🔒 Allow only your extension and trusted sites
const allowedOrigins = [
  'chrome-extension://hoeehbebhmfakndlhlpeghjenpbpebla',
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

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('🟢 A client connected:', socket.id);

  // Default: not identified as the extension
  socket.isExtension = false;

  // Allow extension to identify itself
  socket.on('identify', (role) => {
    if (role === 'extension') {
      socket.isExtension = true;
      console.log(`🔗 Chrome extension identified: ${socket.id}`);
    }
  });

  // Handle incoming messages from users
  socket.on('chat_message', (data) => {
    console.log(`📨 Message from ${data.username}: ${data.message}`);

    // Emit only to connected extensions
    for (const [id, s] of io.of("/").sockets) {
      if (s.isExtension) {
        s.emit('chat_message', data);
      }
    }
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
