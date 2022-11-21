
export const view = {
	// this method takes a string message and displays it
	// in the message display area
	displayMessage: function (msg) {
		// fetch element from the DOM
		var messageArea = document.querySelector("#messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit: function (location){
		//fetch element from the DOM
		var cell = document.getElementById(location);
		// set cell class to hit
		cell.setAttribute("class", "hit");
	},
	displayMiss: function (location){
		//fetch element from the DOM
		var cell = document.getElementById(location);
		// set cell class to miss
		cell.setAttribute("class", "miss");	
	}
};