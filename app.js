
const view = {
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

const model = {
	boardSize : 7,
	numShips : 3,
	shipLength : 3,
	shipsSunk : 0,

	ships: [ 	
			{ locations: [0, 0, 0], hits: ["", "", ""] },
			{ locations: [0, 0, 0], hits: ["", "", ""] },
			{ locations: [0, 0, 0], hits: ["", "", ""] } 
		],

	generateShipLocations: function() {
		var location;

		for(var i = 0; i < this.numShips; i++) {
			do{
				locations = this.generateShip();
			}while(this.collision(locations)) {
				this.ships[i].locations = locations;
			}
		}
	},
	generateShip: function(){
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if(direction === 1) {
			// Generate a starting location for a horizontal ship
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		}else {
			// Generate a starting location for a vertical ship
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];

		for(var i = 0; i < this.shipLength; i++) {

			if(direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			}else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},
	collision: function () {
		for(var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];

			for(var j = 0; j < locations.length; j++){
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
			return false;
		}
	},

	fire: function(guess) {
		for(var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];

			var index = ship.locations.indexOf(guess);

			if(index >= 0)  {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("You HIT my Ship!!");

				if(this.isSunk(ship)){
					view.displayMessage("You sank my battleship!");
					this.shipSunk++;
				}
				return true;
			}
		}

		view.displayMiss(guess);
		view.displayMessage("You MISSED!!");
		return false;
	},
	isSunk: function(ship){
		for(var i = 0; i < this.shipLength; i++) {

			if(ship.hits[i] !== "hit"){
				return false;
			}
		}
		return true;
	}
};

const controller = {
	guesses : 0,

	processGuess: function (guess) {
		var location = this.parseGuess(guess);

		if (location) {
			this.guesses++;
			var hit = model.fire(location);

			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("You sank all my battleships in " + this.guesses + " guesses");
			}
		}
	},
	parseGuess: function (guess) {
		var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

		if(guess === null || guess.length !== 2){
			alert("Oops, please enter a letter and a number on the board.");
		}else {
			firstChar = guess.charAt(0);
			var row = alphabet.indexOf(firstChar);
			var column = guess.charAt(1);

			if(isNaN(row) || isNaN(column)){
				alert("Oops, that isn't on the board.");
			}
			else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
				alert("Oops, that's off the board!");
			}
			else {
				return row + column;
			}
		}
		return null;
	}
};

function init(){
	var fireButton = document.querySelector("#fireButton");
	fireButton.onclick = handleFireButton;

	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	//call a method to generate random ship locations
	model.generateShipLocations();
}

function handleFireButton() {
	// get the player's guess from the form
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;

	// and get it to the controller.
	controller.processGuess(guess);

	//set form to null after submitting fire button
	guessInput.value = "";
}

function handleKeyPress(e) {
	var guessInput = document.getElementById("guessInput");

	if(e.keyCode === 13){
		fireButton.click();
		return false;
	}
}

window.onload = init;
