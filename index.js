const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('🔌 Client connected');

  ws.send(JSON.stringify({ type: 'greeting', message: 'สวัสดีค่ะ! ฉันคือ AI พร้อมสนทนากับคุณค่ะ 😊' }));

  ws.on('message', (message) => {
    console.log('📨 Received:', message);

    // This is where AI response logic will go
    const userMessage = message.toString();
    const reply = `คุณพูดว่า "${userMessage}" ใช่ไหมคะ?`;

    ws.send(JSON.stringify({ type: 'reply', message: reply }));
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`✅ WebSocket server running at ws://localhost:${PORT}`);
});
