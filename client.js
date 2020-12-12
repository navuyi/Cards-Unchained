var myName = null;
var playerName = null;

// Disable all game elements except for the username pane (so players can not mess around with bars etc.)
document.getElementById("teamA").style.visibility = "hidden";
document.getElementById("teamB").style.visibility = "hidden";
document.getElementById("playerIndicator").style.visibility = "hidden";
document.getElementById("timerBar").style.visibility = "hidden";
document.getElementById("cardBar").style.visibility = "hidden";

// Create username button listener to enter the main game view
document.getElementById("usernameButton").addEventListener("click", function(){
	var input = document.getElementById("usernameInput");
	if(input!="" || input!=" " || input!="  "){
		myName = input.value;
		console.log(myName);
		document.getElementById("usernamePane").style.visibility = "hidden";

	// Enable all the game elements
	document.getElementById("teamA").style.visibility = "visible";
	document.getElementById("teamB").style.visibility = "visible";
	document.getElementById("playerIndicator").style.visibility = "visible";
	document.getElementById("timerBar").style.visibility = "visible";
	document.getElementById("cardBar").style.visibility = "visible";

	document.body.style.backgroundImage = "none";
	document.body.style.backgroundColor = "#4b4b4b";
	}
});

//document.body.addEventListener("dblclick", fullscreen);
function fullscreen(){
	var el = document.body;
	if(el.webkitRequestFullScreen){
		el.webkitRequestFullScreen();
	}else{
		el.mozRequestFullScreen();
	}

}

// Connect to the sever
socket = io.connect("127.0.0.1:5555");

// Listen for new cards from another players
socket.on("newCard", function(data){
	var card = createCard(data.x, data.y, data.content, data.cardID);
	document.body.appendChild(card);
	console.log("Creating new card with ID"+data.cardID);
});

// Listen for card's movement
socket.on("moveCard", function(data){
	var card = document.getElementById(data.cardID);
	card.style.left = data.newX;
	card.style.top = data.newY;
});

// Listen for card flipped highlight (on/off)
socket.on("highlightCard", function(data){
	// Highlight off
	if(data.highlight == false){
		document.getElementById(data.cardID).style.backgroundColor = "#3e3e3e";
	}else if(data.highlight == true){
		document.getElementById(data.cardID).style.backgroundColor = "#ff0000";
	}
});

// Listen for out of time signal
socket.on("outOfTime", function(data){
	outOfTime();
});

// Listen for start timer signal
socket.on("startTimer", function(data){
	startTimer(data);
});


// Listen for draw data another players
socket.on("drawData", function(data){
	ctx.beginPath();
    ctx.strokeStyle = data.color;
    ctx.lineWidth = data.width
    ctx.lineJoin = "round";
    ctx.moveTo(data.lastX, data.lastY);
    ctx.lineTo(data.x, data.y);
    ctx.closePath();
    ctx.stroke();
});

// Listen for clear canvas signal
socket.on("clearSig", function(data){
	// Clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);
    document.body.backgroundColor = "#1698f5";   
});


// Listen for take over signal - playerName
socket.on("playerName", function(data){
	document.getElementById("playerIndicatorText").innerHTML = data.playerName;
	// Change player name to new received name
	playerName = data.pleyerName;
});


// Listen for signal to create new player TAG
socket.on("playerTag", function(data){
	if(data.team=="A"){
		createAlfaPlayerTag(data.topPos, data.name, data.tagID);
	}else if(data.team=="B"){
		createBetaPlayerTag(data.topPos, data.name, data.tagID);
	}
});

// Listen for players team tags movement
socket.on("movePlayerTeamTag", function(data){
	var tag = document.getElementById(data.tagID);
	tag.style.top = data.newY;
});