const CAPSULE_INIT_TIMER_X = 8;
var CAPSULE_INIT_TIMER_Y = 40;
const ANIMATION_TIMER = 20;
const NUM_ROTATIONS = 5;

const SPEED_INCREASE = 2;
const NUM_CAPSULES_INCREASE = 10; // NUM CAPSULES TILL SPEED INCREASES

const capsules1 = [2, 7, 12];
const capsules2 = [3, 8, 13];

var init_pastilla1 = 0;
var init_pastilla2 = 0;

var pastilla1 = 0;
var pastilla2 = 0;

var state_new_capsule = 1;
var stopped = true;

// text variables
var top_score = 1000;
var num_score = 0;
var num_virus = 0;
var num_level = 0;
var text_speed = "LOW"

// Scene GAME . Updates and draws a single scene of the game.

function SceneGame() {
	// Load textures fondos
	var fondo_juego = new Texture("../img/fondo_juego_v1.png");

	// Load texture yoshi


	// data estructures with all capsules
	this.pastillasSprites = createPastillas();
	this.cellPastillasSprites = createPastillas();

	// Create objects
	this.imageJuego = new StaticImage(0, 0, 512, 480, fondo_juego);

	// Create Sprites de yoshi


	// Loading texture to use in a TileMap
	var tilesheet = new Texture("../tiles/tiles16.png");

	// Create tilemap
	//this.map = new Tilemap(tilesheet, [16, 16], [5, 5], [184, 176], empty_map, difficulty_level);
	this.map = new Tilemap(tilesheet, [16, 16], [5, 5], [184, 176], mapa_auxiliar2);

	// Store current time
	this.currentTime = 0

	this.capsuleTimerY = CAPSULE_INIT_TIMER_Y;
	this.capsuleTimerX = 0;
	this.animationTimer = ANIMATION_TIMER;

	// aux for speed increase
	this.counterCapsules = 0;

	// controls number of rotations in capsule throwing to map
	this.numRotations = NUM_ROTATIONS;
}


SceneGame.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Game logic
	// new capsule (232,176) is the starting position
	if (state_new_capsule && !stopped) {
		this.animationTimer--;
		if(this.animationTimer <= 0){
			this.numRotations--;
			this.animationTimer = ANIMATION_TIMER;

			if (this.numRotations > 0) {
				var init_data1 = rotate_position(init_pastilla1,
					this.cellPastillasSprites[init_pastilla1].x, this.cellPastillasSprites[init_pastilla1].y);
				var init_data2 = rotate_position(init_pastilla2,
					this.cellPastillasSprites[init_pastilla2].x, this.cellPastillasSprites[init_pastilla2].y);
	
				// new form of pastilla
				init_pastilla1 = init_data1[0];
				init_pastilla2 = init_data2[0];
	
				// new positions of pastilla
				this.cellPastillasSprites[init_pastilla1].x = init_data1[1];
				this.cellPastillasSprites[init_pastilla1].y = init_data1[2];
				this.cellPastillasSprites[init_pastilla2].x = init_data2[1];
				this.cellPastillasSprites[init_pastilla2].y = init_data2[2];

			} else { 
				// LAST THING TO DO
				// capsule in tilemap
				pastilla1 = init_pastilla1;
				pastilla2 = init_pastilla2;

				// starting positions
				this.pastillasSprites[pastilla1].x = 232;
				this.pastillasSprites[pastilla1].y = 176 + 2;
				this.pastillasSprites[pastilla2].x = 248;
				this.pastillasSprites[pastilla2].y = 176 + 2;

				this.create_random_pill();
				state_new_capsule = 0;

				this.numRotations = NUM_ROTATIONS;
			}
		}
	}

	// Move capsule down
	if (!stopped && !state_new_capsule) {
		this.capsuleTimerY--;
		if (this.capsuleTimerY <= 0) {
			this.capsuleTimerY = CAPSULE_INIT_TIMER_Y;
			this.pastillasSprites[pastilla1].y += 16;
			this.pastillasSprites[pastilla2].y += 16;

			// if capsule collides
			if (this.map.collisionMoveDown(this.pastillasSprites[pastilla1])
				|| this.map.collisionMoveDown(this.pastillasSprites[pastilla2])
				|| this.pastillasSprites[pastilla1].y > 448 + 2
				|| this.pastillasSprites[pastilla2].y > 448 + 2) {
				this.pastillasSprites[pastilla1].y -= 16;
				this.pastillasSprites[pastilla2].y -= 16;

				// var broken = false;
				// draw in the tilemap
				this.map.addCapsule(pastilla1,
					this.pastillasSprites[pastilla1].x,
					this.pastillasSprites[pastilla1].y,
					pastilla2,
					this.pastillasSprites[pastilla2].x,
					this.pastillasSprites[pastilla2].y);

				// create new capsule (debug)
				state_new_capsule = 1;
				if (this.counterCapsules >= NUM_CAPSULES_INCREASE) {
					this.counterCapsules = 0;
					if (CAPSULE_INIT_TIMER_Y > 2) {
						CAPSULE_INIT_TIMER_Y -= SPEED_INCREASE;
					}
				} else {
					this.counterCapsules++;
				}
			}
		}

		// Move capsule down faster 
		if (keyboard[40]) { // KEY_DOWN
			this.capsuleTimerY -= 4;
		}


		// Move capsule left & right
		if (this.capsuleTimerX <= 0) {
			if (keyboard[37]) // KEY_LEFT
			{
				this.pastillasSprites[pastilla1].x -= 16;
				this.pastillasSprites[pastilla2].x -= 16;
				if (this.map.collisionMoveLeft(this.pastillasSprites[pastilla1])
					|| this.map.collisionMoveLeft(this.pastillasSprites[pastilla2])) {
					this.pastillasSprites[pastilla1].x += 16;
					this.pastillasSprites[pastilla2].x += 16;
				}
				this.capsuleTimerX = CAPSULE_INIT_TIMER_X;
			}

			if (keyboard[39]) // KEY_RIGHT
			{
				this.pastillasSprites[pastilla1].x += 16;
				this.pastillasSprites[pastilla2].x += 16;
				if (this.map.collisionMoveRight(this.pastillasSprites[pastilla1])
					|| this.map.collisionMoveRight(this.pastillasSprites[pastilla2])) {
					this.pastillasSprites[pastilla1].x -= 16;
					this.pastillasSprites[pastilla2].x -= 16;
				}
				this.capsuleTimerX = CAPSULE_INIT_TIMER_X;
			}
		}
		else { this.capsuleTimerX--; }

		// keep old capsules in case rotation is wrong (backup)
		old_p1 = pastilla1;
		old_p2 = pastilla2;
		aux_rotated = false;

		// Rotate capsule
		if (keyboard[38]) { // KEY UP
			keyboard[38] = false;
			aux_rotated = true;
			// which capsule changes
			//compute new positions
			data1 = rotate_position(pastilla1,
				this.pastillasSprites[pastilla1].x, this.pastillasSprites[pastilla1].y);
			data2 = rotate_position(pastilla2,
				this.pastillasSprites[pastilla2].x, this.pastillasSprites[pastilla2].y);

			// new form of pastilla
			pastilla1 = data1[0];
			pastilla2 = data2[0];

			// new positions of pastilla
			this.pastillasSprites[pastilla1].x = data1[1];
			this.pastillasSprites[pastilla1].y = data1[2];
			this.pastillasSprites[pastilla2].x = data2[1];
			this.pastillasSprites[pastilla2].y = data2[2];
		}

		// position correctors
		if (this.pastillasSprites[pastilla1].x < 184
			|| this.pastillasSprites[pastilla2].x < 184) {
			this.pastillasSprites[pastilla1].x += 16;
			this.pastillasSprites[pastilla2].x += 16;
		}

		if (this.pastillasSprites[pastilla1].x > 312
			|| this.pastillasSprites[pastilla2].x > 312) {
			this.pastillasSprites[pastilla1].x -= 16;
			this.pastillasSprites[pastilla2].x -= 16;
		}

		// backup for wrong rotations (aux_rotated = capsule has rotated)
		if (aux_rotated
			&& (this.map.collisionMoveRight(this.pastillasSprites[pastilla1])
				|| this.map.collisionMoveRight(this.pastillasSprites[pastilla2])
				|| this.map.collisionMoveLeft(this.pastillasSprites[pastilla1])
				|| this.map.collisionMoveLeft(this.pastillasSprites[pastilla2]))) {

			pastilla1 = old_p1;
			pastilla2 = old_p2;
		}
	}

	// EXIT (WITH Q) (DEBUG)
	if (keyboard[81]) {
		keyboard[81] = false;
		whichScene = 0;
	}

	// points things
	if (top_score < num_score) {
		top_score = num_score;
	}

	// update sprites
	this.map.update(deltaTime);

}

SceneGame.prototype.draw = function () // meter argumento
{
	if (aux_updateParameters) {
		aux_updateParameters = false;
		this.updateParameters();
	}
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	// context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	this.imageJuego.draw();

	// Draw tilemap
	this.map.draw();

	// Draw Capsule(s) 
	this.cellPastillasSprites[init_pastilla1].draw();
	this.cellPastillasSprites[init_pastilla2].draw();

	if(!state_new_capsule){
		this.pastillasSprites[pastilla1].draw();
		this.pastillasSprites[pastilla2].draw();
	}
	
	var texts = ["TOP", "SCORE", "LEVEL", "SPEED", "VIRUS"];
	context.font = "bold 20px FreeMono";
	context.fillStyle = "Black"

	context.fillText(texts[0], 36, 136); // TOP TEXT
	context.fillText(top_score, 36, 156); // TOP NUM
	context.fillText(texts[1], 36, 186); // SCORE TEXT
	context.fillText(num_score, 36, 206); // SCORE NUM

	context.fillText(texts[2], 370, 290); // LEVEL TEXT
	context.fillText(num_level, 370, 310); // LEVEL NUM
	context.fillText(texts[3], 370, 340); // SPEED TEXT
	context.fillText(text_speed, 370, 360); // SPEED (NUM)
	context.fillText(texts[4], 370, 390); // VIRUS TEXT
	context.fillText(num_virus, 370, 410); // VIRUS COUNT
}

SceneGame.prototype.updateParameters = function () {
	state_new_capsule = 1;
	this.capsuleTimerY = 100; stopped = false;
	this.capsuleTimerX = 100;
	this.map.addViruses(whichDifficulty);
	//whichSpeed // do something with this two
	//whichMusic

	// texts things
	switch (whichSpeed) {
		case 0: text_speed = "LOW"; break;
		case 1: text_speed = "MID"; break;
		default: text_speed = "HI"; break;
	}
	num_level = whichDifficulty;
	this.create_random_pill();
}

// create random capsule (in yoshi's square)
SceneGame.prototype.create_random_pill = function () {
	console.log("RANDOM PILL")
	init_pastilla1 = capsules1[Math.floor(Math.random() * capsules1.length)];
	init_pastilla2 = capsules2[Math.floor(Math.random() * capsules2.length)];

	this.cellPastillasSprites[init_pastilla1].x = 384;
	this.cellPastillasSprites[init_pastilla1].y = 100;
	this.cellPastillasSprites[init_pastilla2].x = 400;
	this.cellPastillasSprites[init_pastilla2].y = 100;
}

function createPastillas() {
	var all_pastillas = new Texture("../tiles/tiles16.png");
	let pastillasSprites = [];

	// iterate all types (green,red,blue) * (up,down,left,right,neutral,broke)
	for (i = 0; i <= 32; i += 16) {
		for (j = 0; j <= 64; j += 16) {
			var pastiSprite = new Sprite(0, 0, 16, 16, 1, all_pastillas);
			pastiSprite.addAnimation();
			pastiSprite.addKeyframe(0, [j, i, 16, 16]);
			pastillasSprites.push(pastiSprite);
		}
	}
	for (i = 0; i <= 32; i += 16) {
		var pastiSprite = new Sprite(0, 0, 16, 16, 1, all_pastillas);
		pastiSprite.addAnimation();
		pastiSprite.addKeyframe(0, [i, 48, 16, 16]);
		pastillasSprites.push(pastiSprite);
	}

	return pastillasSprites;
}

function rotate_position(number, x, y) {
	number_rotated = 0
	let newx = 0;
	let newy = 0;

	// compute new positions and new capsules to draw
	switch (number % 5) {
		case 0:
			number_rotated = number + 3;
			newx = x + 16;
			newy = y + 16;
			break;
		case 1:
			number_rotated = number + 1;
			newx = x;
			newy = y;
			break;
		case 2:
			number_rotated = number - 2;
			newx = x;
			newy = y - 16;
			break;
		case 3:
			number_rotated = number - 2;
			newx = x - 16;
			newy = y;
			break;
		default:
	}

	return [number_rotated, newx, newy];
}
