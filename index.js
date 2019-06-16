var app = require('express')();
var http = require('http').Server(app);
var mqtt = require('mqtt');
const PORT = process.env.PORT || 5000

// Connecting to avnet API
const platformClientId = '2547';
const platformClientPassword = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJuczAxIiwic3ViIjoiMjU0NyIsInVzZXJfbmFtZSI6ImhhdW1hbnNvbjc2QGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQtb25seSJdLCJleHAiOjE2MjExMzM4NzIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiJkMGY3MjEyYi0yMmMzLTQ3MTYtOTRmNy1iMGIxYjIyMWFkODIiLCJjbGllbnRfaWQiOiJyZWFkLW9ubHkifQ.g0n019kArD5M4XNlg80tVf7MImZKXubjJYAGiP0Ew1M';
const topic = "/v1/users/2547/in/ALERTS"; // general alerts
var susbcribed1 = false;
var options = {
  port: 443,
  host: 'wss://ns01-wss.brainium.com',
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: 'oauth2-user',
  password: platformClientPassword,
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clean: true,
  encoding: 'utf8'
}
var client = mqtt.connect('wss://ns01-wss.brainium.com', options);
client.on('connect', function (){
  console.log("connected to avnet MQTT");
  client.subscribe(topic, function(){
    console.log("subscribed to topic");
  });
});
client.on('message', function(topic, message, packet){
  console.log("Received '" + message + "' on '" + topic + "'");
});



app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(PORT, function() {
  console.log('listening on *:' + process.env.PORT);
});
