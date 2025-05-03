const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let currentRound = [];
let roundNumber = 1;

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('message', async (data) => {
        const { username = 'Anonymous', msg } = data;
        currentRound.push({ id: socket.id, username, message: msg });

        // Broadcast to all clients to update preview
        io.emit('preview_update', { username, message: msg });

        const roundSize = io.engine.clientsCount;

        if (currentRound.length >= roundSize) {
            const payload = {
                round: roundNumber,
                messages: currentRound
            };

            try {
                await axios.post('https://your-api-endpoint.com/receive', payload);
                console.log('Round sent to external server:', payload);
            } catch (err) {
                console.error('Error sending round:', err.message);
            }

            io.emit('round_complete', payload);
            currentRound = [];
            roundNumber++;
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
