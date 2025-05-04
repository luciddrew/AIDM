<!DOCTYPE html>
<html>
<head>
    <title>Chat Room</title>
    <script src="/socket.io/socket.io.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        html, body {
            height: 100%;
            margin: 0;
        }
        .chat-container {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
        .chat-log {
            flex-grow: 1;
            overflow-y: auto;
            padding: 1rem;
            background-color: #f8f9fa;
        }
        .chat-input {
            padding: 1rem;
            border-top: 1px solid #ddd;
            background: white;
        }
        .bubble {
            background: #e2f0d9;
            border-radius: 1rem;
            padding: 0.5rem 1rem;
            margin: 0.25rem 0;
            max-width: 80%;
        }
    </style>
</head>
<body class="chat-container">
    <div class="chat-log" id="chatLog"></div>

    <div class="chat-input">
        <div class="mb-2">
            <label for="username">Username:</label>
            <input id="username" class="form-control" placeholder="Your name" />
        </div>

        <div class="mb-2">
            <textarea id="message" class="form-control" rows="2" placeholder="Type your message..."></textarea>
        </div>

        <div class="d-flex justify-content-between">
            <button class="btn btn-outline-primary" onclick="saveUsername()">Save Name</button>
            <button class="btn btn-success" onclick="sendMessage()">Send</button>
        </div>
    </div>

    <script>
        const socket = io();
        const log = document.getElementById('chatLog');
        const messageInput = document.getElementById('message');
        const usernameInput = document.getElementById('username');

        function saveUsername() {
            const username = usernameInput.value.trim();
            if (!username) return alert("Enter your name");
            localStorage.setItem('username', username);
            alert("Saved!");
        }

        function getUsername() {
            return localStorage.getItem('username') || "";
        }

        function sendMessage() {
            const msg = messageInput.value.trim();
            const username = getUsername();
            if (!msg || !username) return;

            const data = { username, message: msg };
            socket.emit('chat_message', data);
            messageInput.value = '';
            appendMessage(data);
            saveToLocalHistory(data);
        }

        function appendMessage({ username, message }) {
            const item = document.createElement('div');
            item.className = 'bubble bg-light';
            item.innerHTML = `<strong>${username}:</strong> ${message}`;
            log.appendChild(item);
            log.scrollTop = log.scrollHeight;
        }

        function saveToLocalHistory(msg) {
            let history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
            history.push(msg);
            localStorage.setItem('chatHistory', JSON.stringify(history));
        }

        function loadLocalHistory() {
            const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
            history.forEach(appendMessage);
        }

        socket.on('chat_message', (data) => {
            appendMessage(data);
            saveToLocalHistory(data);
        });

        // Initialize
        usernameInput.value = getUsername();
        loadLocalHistory();
    </script>
</body>
</html>
