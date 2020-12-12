

var teamA = document.getElementById("teamA");
var teamB = document.getElementById("teamB");

var teamAText = document.getElementById("teamAText");
var teamBText = document.getElementById("teamBText");

teamA.addEventListener("click", function(){
    var topPos = Math.random()*30 + 30;
    var tagID = Math.round(Date.now()*(Math.random()+100));
    
    createAlfaPlayerTag(topPos, myName, tagID);
    // Send signal to server(other players) to create new player TAG
    data = {
        topPos: topPos,
        name: myName,
        tagID: tagID,
        team: "A"
    }
    socket.emit("playerTag", data);
    
});
teamB.addEventListener("click", function(){
    var topPos = Math.random()*30 + 30;
    var tagID = Math.round(Date.now()*(Math.random()+100));

    createBetaPlayerTag(topPos, myName, tagID);
    // Send signal to server(other players) to create new player TAG
    data = {
        topPos: topPos,
        name: myName,
        tagID: tagID,
        team: "B"
    }
    socket.emit("playerTag", data);
});




function createAlfaPlayerTag(topPos, text, tagID){
    console.log(myName);
    var tag = document.createElement("div");
    var tagText = document.createElement("div");

    // Customize name tag text
    tag.appendChild(tagText);
    tagText.style.position = "absolute";
    tagText.style.top = 50+"%";
    tagText.style.left = 50+"%";
    tagText.style.transform = "translate(-50%, -50%)";
    tagText.style.color = "whitesmoke";
    tagText.style.fontSize = "1vw";
    tagText.innerHTML = text;
    tagText.classList = "noselect";
    
    // Customize name tag
    tag.style.width = "6vw";
    tag.style.height = "4.5vh";
    tag.style.backgroundColor = "#3e3e3e";
    tag.style.position = "absolute";
    tag.style.top = topPos+"%";
    // Customize depending on team (A or B)
   
    tag.style.left = 0+"%";
    tag.style.borderBottomRightRadius = "30px";
    tag.style.borderTopRightRadius = "30px";
    // Create round corners
    tag.style.borderStyle = "solid";
    tag.style.borderWidth = 0+"px";
    
    
    // Implement player tag movement in Y axis
    var isDown = false;
	var mouseCursor;
	var offset;
    // Mouse down detection
	tag.addEventListener("mousedown", function(e){
		isDown = true;
		offset = {
			y: tag.offsetTop - e.clientY
		};
	}, true);

	// Mouse up detection
	document.addEventListener("mouseup", function(){
		isDown = false;
	}, true);

	// Mouse movement detection and card dragging
	document.addEventListener("mousemove", function(e){
		e.preventDefault();

		// Define mouse position
		if (isDown == true){
			mouseCursor = {
				y: e.clientY
			};
			tag.style.top = (mouseCursor.y + offset.y) + "px";

			// Send card movement informations to the server
			var data = {
				newY: (mouseCursor.y + offset.y) + "px",
				tagID: tag.id
			};
            socket.emit("movePlayerTeamTag", data);
		}
    });
    tag.id = tagID;
    document.body.appendChild(tag);
}


function createBetaPlayerTag(topPos, text, tagID){
    console.log(myName);
    var tag = document.createElement("div");
    var tagText = document.createElement("div");

    // Customize name tag text
    tag.appendChild(tagText);
    tagText.style.position = "absolute";
    tagText.style.top = 50+"%";
    tagText.style.left = 50+"%";
    tagText.style.transform = "translate(-50%, -50%)";
    tagText.style.color = "whitesmoke";
    tagText.style.fontSize = "1vw";
    tagText.innerHTML = text;
    tagText.classList = "noselect";
    
    // Customize name tag
    tag.style.width = "6vw";
    tag.style.height = "4.5vh";
    tag.style.backgroundColor = "#3e3e3e";
    tag.style.position = "absolute";
    tag.style.top = topPos+"%";
    // Customize depending on team (A or B)
   
    tag.style.right = 0+"%";
    tag.style.borderBottomLeftRadius = "30px";
    tag.style.borderTopLeftRadius = "30px";
    // Create round corners
    tag.style.borderStyle = "solid";
    tag.style.borderWidth = 0+"px";
    
    
    // Implement player tag movement in Y axis
    var isDown = false;
	var mouseCursor;
	var offset;
    // Mouse down detection
	tag.addEventListener("mousedown", function(e){
		isDown = true;
		offset = {
			y: tag.offsetTop - e.clientY
		};
	}, true);

	// Mouse up detection
	document.addEventListener("mouseup", function(){
		isDown = false;
	}, true);

	// Mouse movement detection and card dragging
	document.addEventListener("mousemove", function(e){
		e.preventDefault();

		// Define mouse position
		if (isDown == true){
			mouseCursor = {
				y: e.clientY
			};
			tag.style.top = (mouseCursor.y + offset.y) + "px";

			//Send card movement informations to the server
			var data = {
				newY: (mouseCursor.y + offset.y) + "px",
				tagID: tag.id
			};
            socket.emit("movePlayerTeamTag", data);
		}
    });
    tag.id = tagID;
    document.body.appendChild(tag);
}


