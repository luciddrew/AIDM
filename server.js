const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require("cors");            // ✅ Add this

const app = express();
app.use(cors());                         // ✅ And this line

const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" folder
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for chat messages from this client
    socket.on('chat_message', (data) => {
        console.log(`Message from ${data.username}: ${data.message}`);
        // Broadcast the message to all clients (including the sender)
        io.emit('chat_message', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
