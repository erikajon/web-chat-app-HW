var express = require('express'); // Use the express library. 
var app = express(); // Create our app. 
var server = require('http').createServer(app); // Create an HTTP server.
server.listen(process.env.PORT || 4000, function() {
  console.log('Server is running on http://localhost:4000')
}); // Listen on the default port, or on 4000 if there's not one.

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  socket.emit('connected');
  socket.on('chat', function(data) {
    socket.broadcast.emit('chat', data);
  });
  socket.on('chat', function(data) {
    writeLine(data.name, data.line);
  });
  socket.on('action', function(data) {
    writeAction(data.name, data.action);
  });
  socket.on('action', function(data) {
    socket.broadcast.emit('action', data);
  });
});