const FPS = 30; //frames per second
const SHIP_SIZE = 30; // ship size in pixels
const TURN_SPEED = 360; // turn speed in degrees per second

/** @type {HTMLCanvasElement} */
var canv = document.getElementById("gameCanvas");
var ctx = canv.getContext("2d");

var ship = {
	x: canv.width / 2,
	y: canv.height / 2,
	r: SHIP_SIZE / 2,
	a: 90 / 180 * Math.PI, // convert to radians
	rot: 0
}

// set up event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyup);

// set up the game loop
setInterval(update, 1000 / FPS);

function keyDown( /** @type (KeyboardEvent)*/ ev) {
	switch (ev.keyCode) {
		case 37: // left arrow key (rotate ship left)
			ship.rot = TURN_SPEED / 180 * Math.PI / FPS;
			break;

		case 38: // up arrow key  ( thrusts ship forward)

			break;

		case 39: // right arrow key  (rotate ship right)
			ship.rot = -TURN_SPEED / 180 * Math.PI / FPS;
			break;

	}
}

function keyup() {
	switch (ev.keyCode) {
		case 37: // left arrow key (stop rotating)
			ship.rot = 0;
			break;

		case 38: // up arrow key  ( stop thrusting forward)

			break;

		case 39: // right arrow key  (stop rotating)
			ship.rot = 0;
			break;

	}
}
function update() {

		// draw space
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canv.width, canv.height);

		//draw a triangular ship
		ctx.strokeStyle = "white";
		ctx.lineWidth = SHIP_SIZE / 20;
		ctx.beginPath();
		ctx.moveTo( // nose of the ship
			ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
			ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
		);
		ctx.lineTo( // rear left
			ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
			ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
		);

		ctx.lineTo( // rear right
			ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
			ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
		);
		ctx.closePath();
		ctx.stroke();
		// rotate ship
		ship.a += ship.rot;

		// move the ship


		// center of dot
		ctx.fillStyle = "red";
		ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
}