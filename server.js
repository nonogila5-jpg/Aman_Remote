const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
  res.send('🚀 الخادم يعمل بنجاح!');
});

let users = {};

io.on('connection', (socket) => {
  console.log('📡 مستخدم متصل');

  socket.on('login', (username) => {
    users[socket.id] = username;
    socket.emit('loginSuccess', `مرحبًا ${username}`);
  });

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`${users[socket.id]} انضم إلى الغرفة: ${room}`);
  });

  socket.on('signal', (data) => {
    io.to(data.room).emit('signal', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ مستخدم غادر');
    delete users[socket.id];
  });
});

server.listen(3000, () => {
  console.log('✅ الخادم يعمل على المنفذ 3000');
});