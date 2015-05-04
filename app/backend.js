var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {path: '/mean/socket.io'});

app.get('/mean', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('login', function(user){
    io.emit('user-login', user);
    console.log(user + ' connected');
    socket.user = user;
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg.user + ': ' + msg.msg)
  });
  socket.on('disconnect', function(){
    io.emit('user-disconnect', socket.user);
    console.log(socket.user + ' disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
