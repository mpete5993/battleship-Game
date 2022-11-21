
//Variable to hold ship location

var randomLoc = Math.floor(Math.random() * 5);// assigning a random location
var location_1 = randomLoc;
var location_2 = location_1 + 1;
var location_3 = location_2 + 1;

var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while(isSunk == false) {

	guess = prompt("Ready, aim, fire! (enter a number 0-6):");

	if (guess < 0 || guess > 6) {
		alert("please enter a valid input");
	}
	else {

		guesses++;

		if (guess == location_1 || guess == location_2 || guess == location_3) {
			alert("You Hit");
			hits++;
			if (hits == 3) {
				isSunk = true;
				alert("You sank my battleship!");
			}
		}
		else{
			alert("You Missed");
		}
	}
}
var stats = "You took " + guesses + " guesses to sink the battleship, " + "which means your shooting accuracy was " + (3/guesses);
alert(stats);