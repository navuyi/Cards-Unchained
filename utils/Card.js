function createCard(x, y, text, cardID){
	var card = document.createElement("div");
	var cardText = document.createElement("div");
	var visible = false;
	var isDown = false;
	var mouseCursor;
	var offset;

	const cardBG = "#3e3e3e";
	const cardWidth = 200;
	const cardHeight = 50;

	// Card properties
	card.style.backgroundColor = cardBG;
	card.style.borderRadius = 20 + "px";
	card.style.borderStyle = 'dashed';
	card.style.borderWidth = 2 + "px";
	card.style.borderColor = "#ffffff";
	card.style.width = cardWidth/2 + "px";
	card.style.height = cardHeight + "px";
	card.style.textAlign = 'center';

	card.style.position = "absolute";
	card.style.left = x + "px";
	card.style.top = y + "px";

	// Card text properties
	cardText.innerText = text;
	cardText.style.fontSize = 15 + "px";
	cardText.style.color = "white";
	cardText.style.position = 'relative';
	cardText.style.left = 50 + "%";
	cardText.style.top = 50 + "%";
	cardText.style.transform = "translate(-50%, -50%)";

	// Create cards folded and with hidden content
	cardText.style.visibility = 'hidden';

	// Disable text select highlighting using CSS 
	cardText.classList = "noselect";

	// Create card's unique ID
	card.id = cardID;
	
	card.appendChild(cardText);


	// Flip card and send signal to other clients to HIGHLIGHT flipped card (not flip just highlight)
	card.addEventListener("dblclick", function(){
		if(myName == playerName){
			if (visible == true){
				// Hide card content
				cardText.style.visibility = 'hidden';
				// Fold card
				card.style.width = cardWidth/2 + "px";
				visible = false;

				// Send signal to the server to highlight flipped card
				data = {
					cardID: card.id,
					highlight: visible
				}
				socket.emit("highlightCard", data);
			} else{
				// Show card content
				cardText.style.visibility = 'visible';
				// Unfold card
				card.style.width = cardWidth + "px";
				//card.style.height = cardHeight + "px";
				visible = true;

				// Send signal to the server to switch off card highlight
				data = {
					cardID: card.id,
					highlight: visible
				}
				socket.emit("highlightCard", data);
			}
		}
	});

	// Mouse down detection
	card.addEventListener("mousedown", function(e){
		isDown = true;
		offset = {
			x: card.offsetLeft - e.clientX,
			y: card.offsetTop - e.clientY
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
				x: e.clientX,
				y: e.clientY
			};
			card.style.left = (mouseCursor.x + offset.x) + "px";
			card.style.top = (mouseCursor.y + offset.y) + "px";

			// Send card movement informations to the server
			var data = {
				newX: (mouseCursor.x + offset.x) + "px",
				newY: (mouseCursor.y + offset.y) + "px",
				cardID: card.id
			};
			socket.emit("moveCard", data);
		}
	});




	return card;
}