const PORT = 5555;
var express = require('express');
var app = express();

var server = app.listen(PORT);
app.use(express.static('public_html'));
var socket = require('socket.io');
var io = socket(server);


console.log("[SERVER] Server is running");

// Handle new connection
io.sockets.on('connection', function(socket){
	console.log("[SERVER] Client connected");

	// Broadcast new card's informations to clients (except the sender)
	socket.on("newCard", function(data){
		socket.broadcast.emit("newCard", data);
		console.log(data.cardID);
	});

	// Broadcast card's new position to clients (except the sender)
	socket.on("moveCard", function(data){
		socket.broadcast.emit("moveCard" ,data);
	});

	// Broadcast card flipped highlight on/off to clients
	socket.on("highlightCard", function(data){
		socket.broadcast.emit("highlightCard", data);
	});

	// Broadcast out of time signal to clients (except the sender)
	socket.on("outOfTime", function(data){
		socket.broadcast.emit("outOfTime", data);
	});

	// Broadcast start timer signal to clients (except the sender)
	socket.on("startTimer", function(data){
		socket.broadcast.emit("startTimer", data);
	});


	// Broadcast draw data to clients (except the sender)
	socket.on("drawData", function(data){
		socket.broadcast.emit("drawData", data);
	});

	// Broadcast clear canvas signal to clients(except the sender)
	socket.on("clearSig", function(data){
		socket.broadcast.emit("clearSig", data);
	});

	// Broadcast playerName to clients(except the sender)
	socket.on("playerName", function(data){
		socket.broadcast.emit("playerName", data);
	});

	// Broadcast signal to create new player TAG
	socket.on("playerTag", function(data){
		console.log(data);
		socket.broadcast.emit("playerTag", data);
	});

	// Broadcast player team tag's new position to clients
	socket.on("movePlayerTeamTag", function(data){
		console.log(data);
		socket.broadcast.emit("movePlayerTeamTag", data);
	});

	


});


