
	var toggleBar = document.getElementById("toggleBar");
	var cardBar = document.getElementById("cardBar");
	var cardAddButton = document.getElementById("cardAddButton");
	var cardInput = document.getElementById("cardInput");
	var isUp = true;

	
	// Roll the card bar up and down
	toggleBar.addEventListener("click", function(){
		// Roll down 
		if(isUp == true){
			var val = (0.75*cardBar.offsetHeight) + "px";
			cardBar.style.transform = "translateY("+val+")";
			cardBar.style.transition = "transform 200ms";
			isUp = false;
		}
		// Roll up
		else{
			cardBar.style.transform = "translateY(0px)";
			isUp = true;
		}
	});

	// Handle card adding
	cardAddButton.addEventListener("click", function(){
		var cardContent = cardInput.value;
		var cardID = Math.round(Date.now() * (Math.random()+100));
		if(cardContent){
			console.log(cardContent);
			var x = Math.random()*600 + 600;
			var y = Math.random()*500 + 100;
			card = createCard(x, y, cardContent, cardID);
			document.body.appendChild(card);

			// Clear card input
			cardInput.value = null;

			// Send new card to the server
			data = {
				x: x,
				y: y,
				content: cardContent,
				cardID: card.id
			};
			socket.emit("newCard", data);
		}	
	});
