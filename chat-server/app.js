// app.js

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [];
var storeMessage = function(name, data){
	messages.push({name: name, data: data});
	if(messages.length>10){
		messages.shift();
	}
}

io.on('connection', function(client) {
	console.log('Client connected...');
	// client.emit('messages', {
	// 	hello: 'world'
	// });
	client.on('join', function(name){
		client.nickname = name;
		messages.forEach(function(message){
			client.emit('messages', message.name+": "+message.data);
		});
	});

	client.on('messages', function(data){
		console.log(data);
		var nickname = client.nickname;
		client.broadcast.emit('messages', nickname+': '+data);
		// client.emit('messages', nickname+': '+data);
		storeMessage(nickname, data);
	});
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/realtimechat.html");
});

server.listen(3000, function(){
	console.log('listening on *:8080');
});