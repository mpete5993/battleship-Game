import { controller } from "./controller.js";
import { view } from "./view.js";

export const model = {
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
