var timeDisplay = document.getElementById("timeDisplay")
var countdown = null;
var timerBar = document.getElementById("timerBar");
var timeValueSelect = document.getElementById("timeValueSelect");
var startButton = document.getElementById("startButton");
var stopButton = document.getElementById("stopButton");


// Start timer countdown
startButton.addEventListener("click", function(){
	var timeValue = timeValueSelect.value;
	startTimer(timeValue);
	startTimerSignal(timeValue);
});

// Stop timer countdown
stopButton.addEventListener("click", function(){
	if(countdown){
		outOfTime();
		outOfTimeSignal();
	}
});

function startTimer(timeValue){
	countdown = setInterval(function(){
		timeDisplay.innerHTML = timeValue;
		timeValue -= 1;
		// Stop timer countdown when time is over
		if(timeValue<0){
			outOfTime();
			outOfTimeSignal();
		}
	}, 1000);
}

function startTimerSignal(timeValue){
	socket.emit("startTimer", timeValue);
}

// Create visual effect when time is over, reset timer
function outOfTime(){
	document.body.style.backgroundColor = "#ff0000";
	document.body.style.transition = "background-color 1000ms linear";
	var back = setTimeout(function(){
		document.body.style.backgroundColor = "#1698f5";
		document.body.style.transition = "background-color 2000ms linear";
		console.log("Dzialam");
	}, 1100);
	clearInterval(countdown);
	timeDisplay.innerHTML = "-";
	countdown = null;
};

// Send out of time signal to server
function outOfTimeSignal(){
	socket.emit("outOfTime", true);
}

// Create PLAY button event listener
document.getElementById("cardsPrivileges").addEventListener("click", function(){
	console.log("I am taking over control");
	// Send signal to take over control over timer BAR and drawing
	data={
		playerName: myName
	}
	socket.emit("playerName",data);
	// Change playerName to my name
	playerName = myName
	document.getElementById("playerIndicatorText").innerHTML = playerName;
});


