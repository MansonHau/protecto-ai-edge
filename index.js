var app = require('express')();
var http = require('http').Server(app);
const PORT = process.env.PORT || 5000

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(PORT, function() {
  console.log('listening on *:' + process.env.PORT);
});
