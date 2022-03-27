const CAPSULE_INIT_TIMER_X = 8;
var CAPSULE_INIT_TIMER_Y = 40;

const NEXT_LEVEL_TIMER = 100;
const GLASS_DESTRUCTION_TIMER = 60;

const ANIMATION_TIMER = 1;
const NUM_ROTATIONS = 17;

const SPEED_INCREASE = 2;
const NUM_CAPSULES_INCREASE = 10; // NUM CAPSULES TILL SPEED INCREASES

const capsules1 = [2, 7, 12];
const capsules2 = [3, 8, 13];

var init_pastilla1 = 0;
var init_pastilla2 = 0;

var pastilla1 = 0;
var pastilla2 = 0;

var state_new_capsule = true;
var state_stopped = true;
var state_end = false;
var state_nextlevel = false;


// text variables
var top_score = 1000;
var num_score = 0;
var num_virus = 0;
var num_level = 0;
var text_speed = "LOW"

// sprite lupa variables
var virus_in_glass = [false, false, false];

// music variables
var playOnceV = [true, true, true];
var virusGlassSound = AudioFX('../sounds/virus_destruction_glass.mp3', { volume: 1.0 });
var moveSound = AudioFX('../sounds/move_capsule-1.mp3', { volume: 1.0 });
var rotateSound = AudioFX('../sounds/rotate.mp3', { volume: 1.0 });


// Scene GAME . Updates and draws a single scene of the game.
function SceneGame() {
	// Load textures fondos
	var fondo_juego = new Texture("../img/fondo_juego_v1.png");

	// Load texture yoshi
	var texture_yoshi = new Texture("../sprites/sprites_yoshi.png");


	// data estructures with all capsules
	this.pastillasSprites = createPastillas();
	this.cellPastillasSprites = createPastillas();

	// Create objects
	this.imageJuego = new StaticImage(0, 0, 512, 480, fondo_juego);

	/* START SPRITE CREATION */
	this.yoshiNeutral = new Sprite(370, 90, 115, 110, 1, texture_yoshi);
	this.yoshiTongue1 = new Sprite(370, 90, 115, 110, 1, texture_yoshi);
	this.yoshiTongue2 = new Sprite(370, 90, 115, 110, 1, texture_yoshi);
	this.yoshiHappy = new Sprite(370, 90, 115, 110, 1, texture_yoshi);
	this.yoshiSad = new Sprite(370, 90, 115, 110, 1, texture_yoshi);
	this.glass = new Sprite(10, 300, 150, 159, 1, texture_yoshi);
	this.virusGlassGreen = new Sprite(50, 380, 32, 32, 1, texture_yoshi); // (50,380)
	this.virusGlassRed = new Sprite(70, 320, 32, 32, 1, texture_yoshi); // (70,320)
	this.virusGlassBlue = new Sprite(100, 370, 32, 32, 1, texture_yoshi); // (100,370)
	this.virusGlassGreenHappy = new Sprite(50, 380, 32, 32, 1, texture_yoshi);
	this.virusGlassRedHappy = new Sprite(70, 320, 32, 32, 1, texture_yoshi);
	this.virusGlassBlueHappy = new Sprite(100, 370, 32, 32, 1, texture_yoshi);
	this.virusDestruction = new Sprite(0, 0, 32, 32, 1, texture_yoshi);

	this.signSprite = new Sprite(190, 190, 133, 102, 1, texture_yoshi); // faltan coordenadas buenas
	this.spriteSalir = new Sprite(230, 250, 45, 19, 1, texture_yoshi);
	this.spriteGanaste = new Sprite(215, 210, 81, 19, 1, texture_yoshi);
	this.spritePerdiste = new Sprite(210, 210, 90, 19, 1, texture_yoshi);
	this.spriteSNivel = new Sprite(215, 240, 81, 38, 1, texture_yoshi);
	this.spriteBien = new Sprite(203, 210, 108, 19, 1, texture_yoshi);


	this.yoshiNeutral.addAnimation();
	this.yoshiTongue1.addAnimation();
	this.yoshiTongue2.addAnimation();
	this.yoshiHappy.addAnimation();
	this.yoshiSad.addAnimation();
	this.glass.addAnimation();
	this.virusGlassBlue.addAnimation();
	this.virusGlassGreen.addAnimation();
	this.virusGlassRed.addAnimation();
	this.virusGlassBlueHappy.addAnimation();
	this.virusGlassGreenHappy.addAnimation();
	this.virusGlassRedHappy.addAnimation();
	this.virusDestruction.addAnimation();
	this.signSprite.addAnimation();
	this.spriteSalir.addAnimation();
	this.spriteGanaste.addAnimation();
	this.spritePerdiste.addAnimation();
	this.spriteSNivel.addAnimation();
	this.spriteBien.addAnimation();


	this.yoshiNeutral.addKeyframe(0, [0, 0, 115, 110]);
	this.yoshiNeutral.addKeyframe(0, [0, 110, 115, 110]);
	this.yoshiTongue1.addKeyframe(0, [115, 0, 115, 110]);
	this.yoshiTongue2.addKeyframe(0, [115, 110, 115, 110]);
	this.yoshiHappy.addKeyframe(0, [230, 0, 115, 110]);
	this.yoshiHappy.addKeyframe(0, [230, 110, 115, 110]);
	this.yoshiSad.addKeyframe(0, [345, 0, 115, 110]);
	this.yoshiSad.addKeyframe(0, [345, 110, 115, 110]);
	this.glass.addKeyframe(0, [0, 220, 150, 159]);
	this.glass.addKeyframe(0, [150, 220, 150, 159]);

	this.virusGlassGreen.addKeyframe(0, [300, 220, 32, 32]);
	this.virusGlassRed.addKeyframe(0, [332, 220, 32, 32]);
	this.virusGlassBlue.addKeyframe(0, [364, 220, 32, 32]);
	this.virusGlassGreen.addKeyframe(0, [300, 252, 32, 32]);
	this.virusGlassRed.addKeyframe(0, [332, 252, 32, 32]);
	this.virusGlassBlue.addKeyframe(0, [364, 252, 32, 32]);
	this.virusGlassGreen.addKeyframe(0, [300, 284, 32, 32]);
	this.virusGlassRed.addKeyframe(0, [332, 284, 32, 32]);
	this.virusGlassBlue.addKeyframe(0, [364, 284, 32, 32]);
	this.virusGlassGreen.addKeyframe(0, [300, 316, 32, 32]);
	this.virusGlassRed.addKeyframe(0, [332, 316, 32, 32]);
	this.virusGlassBlue.addKeyframe(0, [364, 316, 32, 32]);
	this.virusGlassGreenHappy.addKeyframe(0, [396, 220, 32, 32]);
	this.virusGlassRedHappy.addKeyframe(0, [428, 220, 32, 32]);
	this.virusGlassBlueHappy.addKeyframe(0, [460, 220, 32, 32]);
	this.virusGlassGreenHappy.addKeyframe(0, [396, 252, 32, 32]);
	this.virusGlassRedHappy.addKeyframe(0, [428, 252, 32, 32]);
	this.virusGlassBlueHappy.addKeyframe(0, [460, 252, 32, 32]);
	this.virusDestruction.addKeyframe(0, [396, 284, 32, 32]);
	this.virusDestruction.addKeyframe(0, [428, 284, 32, 32]);
	this.virusDestruction.addKeyframe(0, [396, 316, 32, 32]);
	this.virusDestruction.addKeyframe(0, [428, 316, 32, 32]);

	this.signSprite.addKeyframe(0, [0, 379, 133, 102]);
	this.signSprite.addKeyframe(0, [133, 379, 133, 102]);
	this.spriteSalir.addKeyframe(0, [300, 348, 45, 19]);
	this.spriteSalir.addKeyframe(0, [345, 348, 45, 19]);
	// this.spriteGanaste.addKeyframe(0, [266, 417, 81, 19]);
	this.spriteGanaste.addKeyframe(0, [266, 436, 81, 19]);
	// this.spritePerdiste.addKeyframe(0, [266, 455, 90, 19]);
	this.spritePerdiste.addKeyframe(0, [356, 455, 90, 19]);
	this.spriteSNivel.addKeyframe(0, [374, 379, 81, 38]);
	this.spriteSNivel.addKeyframe(0, [374, 417, 81, 38]);
	// this.spriteBien.addKeyframe(0, [266, 379, 108,19]);
	this.spriteBien.addKeyframe(0, [266, 398, 108, 19]);

	this.yoshiNeutral.setAnimation(0);
	this.yoshiTongue1.setAnimation(0);
	this.yoshiTongue2.setAnimation(0);
	this.yoshiHappy.setAnimation(0);
	this.yoshiSad.setAnimation(0);
	this.glass.setAnimation(0);
	this.virusGlassBlue.setAnimation(0);
	this.virusGlassGreen.setAnimation(0);
	this.virusGlassRed.setAnimation(0);
	this.virusGlassBlueHappy.setAnimation(0);
	this.virusGlassGreenHappy.setAnimation(0);
	this.virusGlassRedHappy.setAnimation(0);
	this.virusDestruction.setAnimation(0);
	this.signSprite.setAnimation(0);
	this.spriteSalir.setAnimation(0);
	this.spriteGanaste.setAnimation(0);
	this.spritePerdiste.setAnimation(0);
	this.spriteSNivel.setAnimation(0);
	this.spriteBien.setAnimation(0);

	/* END SPRITE CREATION */

	// Loading texture to use in a TileMap
	var tilesheet = new Texture("../tiles/tiles16.png");

	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [5, 5], [184, 176], empty_map);

	// Store current time
	this.currentTime = 0

	// initialize TIMERS
	this.capsuleTimerY = CAPSULE_INIT_TIMER_Y;
	this.capsuleTimerX = 0;
	this.animationTimer = ANIMATION_TIMER;
	this.numRotations = NUM_ROTATIONS; // controls number of rotations in capsule throwing to map
	this.nextLevelTimer = NEXT_LEVEL_TIMER; // controls time between levels
	this.destructionGlassTimer = GLASS_DESTRUCTION_TIMER; // controls animation of destruction virus in glass

	// aux for speed increase
	this.counterCapsules = 0;

	// aux for which yoshi to draw (0:neutral, 1:tongue, 2:happy, 3:sad)
	this.whichYoshi = 0;

	// aux for animation destruction glass
	this.destructionGlass = [false, 1];
	this.virus_draw = [true, true, true];

	// Prepare sounds
	this.playMusic = true;
	this.playOnceT = true;
	playOnceV = [true, true, true];
	this.gameMusic = AudioFX('../sounds/game_flower_garden.wav', { loop: true, volume: 0.4 });
	this.tongueSound = AudioFX('../sounds/throw_capsule.wav', { volume: 0.4 });
	this.nextlevelSound = AudioFX('../sounds/next_level.wav', { volume: 0.35 });
	this.winSound = AudioFX('../sounds/win.wav', { volume: 0.35 });
	this.gameoverSound = AudioFX('../sounds/game_over.wav', { volume: 0.35 });
}


SceneGame.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Game logic
	// new capsule (232,176) is the starting position
	if (!state_end && !state_stopped && state_new_capsule && !state_nextlevel) {
		if (this.numRotations == NUM_ROTATIONS) {
			this.tongueSound.stop();
			this.tongueSound.play();
		}
		this.animationTimer--;
		if (this.animationTimer <= 0) {
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

				var despl = computeAnimationPositions(this.numRotations);

				// new positions of pastilla
				this.cellPastillasSprites[init_pastilla1].x = init_data1[1] + despl[0];
				this.cellPastillasSprites[init_pastilla1].y = init_data1[2] + despl[1];
				this.cellPastillasSprites[init_pastilla2].x = init_data2[1] + despl[0];
				this.cellPastillasSprites[init_pastilla2].y = init_data2[2] + despl[1];

				// which yoshi to draw
				if (this.numRotations > 12 || this.numRotations < 6) {
					this.whichYoshi = 3;
				} else {
					this.whichYoshi = 4;
				}

			} else {
				// capsule in tilemap
				pastilla1 = init_pastilla1;
				pastilla2 = init_pastilla2;

				// starting positions
				this.pastillasSprites[pastilla1].x = 232;
				this.pastillasSprites[pastilla1].y = 176 + 2;
				this.pastillasSprites[pastilla2].x = 248;
				this.pastillasSprites[pastilla2].y = 176 + 2;

				// check if can be drawn
				if (this.map.checkNewCapsule(this.pastillasSprites[pastilla1].x,
					this.pastillasSprites[pastilla1].y,
					this.pastillasSprites[pastilla2].x,
					this.pastillasSprites[pastilla2].y)) {
					state_end = true;
				};

				this.create_random_pill();
				state_new_capsule = 0;

				this.numRotations = NUM_ROTATIONS;

				// return to draw original yoshi
				this.whichYoshi = 0;
			}
		}
	}

	// Move capsule down
	if (!state_end && !state_stopped && !state_new_capsule && !state_nextlevel) {
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
			this.capsuleTimerY -= 8;
		}


		// Move capsule left & right
		if (this.capsuleTimerX <= 0) {
			//moveSound.stop();
			if (keyboard[37]) // KEY_LEFT
			{
				moveSound.play();
				this.pastillasSprites[pastilla1].x -= 16;
				this.pastillasSprites[pastilla2].x -= 16;
				if (this.map.collisionMoveLeft(this.pastillasSprites[pastilla1])
					|| this.map.collisionMoveLeft(this.pastillasSprites[pastilla2])) {
					moveSound.stop();
					this.pastillasSprites[pastilla1].x += 16;
					this.pastillasSprites[pastilla2].x += 16;
				}
				this.capsuleTimerX = CAPSULE_INIT_TIMER_X;
			}

			if (keyboard[39]) // KEY_RIGHT
			{
				moveSound.play();
				this.pastillasSprites[pastilla1].x += 16;
				this.pastillasSprites[pastilla2].x += 16;
				if (this.map.collisionMoveRight(this.pastillasSprites[pastilla1])
					|| this.map.collisionMoveRight(this.pastillasSprites[pastilla2])) {
					moveSound.stop();
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

			rotateSound.play();

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

	// // EXIT (WITH Q) (DEBUG)
	// if (keyboard[81]) {
	// 	keyboard[81] = false;
	// 	state_end = true;
	// 	whichScene = 0;
	// }


	// points things
	if (top_score < num_score) top_score = num_score;


	if (num_virus <= 0) {
		state_nextlevel = true;
		this.whichYoshi = 1;
	}

	// new level
	if (state_nextlevel && !state_end) {
		this.gameMusic.stop();

		// music logic
		if (this.playOnceT && num_score > 0) {
			this.nextlevelSound.play();
			this.playOnceT = false;
		}// dirty play i know

		if (keyboard[13]) { // ENTER
			keyboard[13] = false;
			whichDifficulty++;
			this.updateParameters();
			this.nextlevelSound.stop();
		}
	}

	if (state_end) {
		this.gameMusic.stop();
		// SPRITE GAME OVER
		if (num_virus == 0) {
			// WIN
			this.whichYoshi = 1;
			if (this.playOnceT) {
				this.winSound.play();
				this.playOnceT = false;
			}
			// music logic
		} else {
			// LOSE
			this.whichYoshi = 2;
			if (this.playOnceT) {
				this.gameoverSound.play();
				this.playOnceT = false;
			}
			// music logic
		}

		if (keyboard[13]) { // ENTER
			keyboard[13] = false;
			whichScene = 1;
			this.gameoverSound.stop();
			this.winSound.stop();
		}
	}

	// music logic
	if (!state_end && this.playMusic) {
		this.gameMusic.play();
	}

	this.destructionGlass[0] = false;

	// destroying glass virus
	if (!virus_in_glass[0] && this.virus_draw[0]) { // green destroyed
		if (playOnceV[0]) {
			playOnceV[0] = false;
		}
		virusGlassSound.play();
		this.destructionGlass[0] = true;
		this.virusDestruction.x = 50;
		this.virusDestruction.y = 380;
		this.destructionGlassTimer--;
		if (this.destructionGlassTimer <= 0) {
			this.virus_draw[0] = false;
			this.destructionGlassTimer = GLASS_DESTRUCTION_TIMER;
			this.destructionGlass[0] = false;
		}
	}
	if (!virus_in_glass[1] && this.virus_draw[1]) { // red destroyed
		if (playOnceV[1]) {
			playOnceV[1] = false;
		}
		virusGlassSound.play();
		this.destructionGlass[0] = true;
		this.virusDestruction.x = 70;
		this.virusDestruction.y = 320;
		this.destructionGlassTimer--;
		if (this.destructionGlassTimer <= 0) {
			this.virus_draw[1] = false;
			this.destructionGlassTimer = GLASS_DESTRUCTION_TIMER;
			this.destructionGlass[0] = false;
		}
	}
	if (!virus_in_glass[2] && this.virus_draw[2]) { // blue destroyed
		if (playOnceV[2]) {
			playOnceV[2] = false;
		}
		virusGlassSound.play();
		this.destructionGlass[0] = true;
		this.virusDestruction.x = 100;
		this.virusDestruction.y = 370;
		this.destructionGlassTimer--;
		if (this.destructionGlassTimer <= 0) {
			this.virus_draw[2] = false;
			this.destructionGlassTimer = GLASS_DESTRUCTION_TIMER;
			this.destructionGlass[0] = false;
		}
	}

	// update sprites
	this.map.update(deltaTime + 16);

	this.yoshiNeutral.update(deltaTime + 20);
	this.yoshiHappy.update(deltaTime);
	this.yoshiTongue1.update(deltaTime);
	this.yoshiTongue2.update(deltaTime);
	this.yoshiSad.update(deltaTime);

	this.glass.update(deltaTime - 5);
	this.virusGlassBlue.update(deltaTime + 26);
	this.virusGlassGreen.update(deltaTime + 26);
	this.virusGlassRed.update(deltaTime + 26);
	this.virusGlassBlueHappy.update(deltaTime + 26);
	this.virusGlassGreenHappy.update(deltaTime + 26);
	this.virusGlassRedHappy.update(deltaTime + 26);

	this.virusDestruction.update(deltaTime + 40);

	this.signSprite.update(deltaTime + 20);
	this.spriteSalir.update(deltaTime + 20);
	//this.spriteGanaste.update(deltaTime);
	//this.spritePerdiste.update(deltaTime);
	this.spriteSNivel.update(deltaTime + 20);
	//this.spriteBien.update(deltaTime);
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

	if (!state_new_capsule) {
		this.pastillasSprites[pastilla1].draw();
		this.pastillasSprites[pastilla2].draw();
	}

	// draw sprites
	// draw glass and virus in glass
	if (!state_end && num_virus > 0) {
		if (virus_in_glass[0]) this.virusGlassGreen.draw();
		if (virus_in_glass[1]) this.virusGlassRed.draw();
		if (virus_in_glass[2]) this.virusGlassBlue.draw();
	} else if (state_end && num_virus > 0) {
		if (virus_in_glass[0]) this.virusGlassGreenHappy.draw();
		if (virus_in_glass[1]) this.virusGlassRedHappy.draw();
		if (virus_in_glass[2]) { this.virusGlassBlueHappy.draw(); }

		this.signSprite.draw();
		this.spritePerdiste.draw();
		this.spriteSalir.draw();

	} else { // state end == true
		this.signSprite.draw();
		this.spriteGanaste.draw();
		this.spriteSalir.draw();
	}

	if (state_nextlevel && !state_end) {
		this.signSprite.draw();
		this.spriteBien.draw();
		this.spriteSNivel.draw();
	}

	if (this.destructionGlass[0]) {
		this.virusDestruction.draw();
	}

	this.glass.draw();
	// draw yoshi
	switch (this.whichYoshi) {
		case 1: this.yoshiHappy.draw(); break;
		case 2: this.yoshiSad.draw(); break;
		case 3: this.yoshiTongue1.draw(); break;
		case 4: this.yoshiTongue2.draw(); break;
		default: this.yoshiNeutral.draw();; break;
	}

	// draw texts
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
	if (whichDifficulty >= 6) {
		// END GAME
		// SPRITE WELL DONE Y FIN DEL JUEGO
		state_end = true;
	} else {
		// fix states
		state_end = false;
		state_new_capsule = true;
		state_stopped = false;
		state_nextlevel = false;

		// reset timers
		this.capsuleTimerY = CAPSULE_INIT_TIMER_Y;
		this.capsuleTimerX = CAPSULE_INIT_TIMER_X;
		this.animationTimer = ANIMATION_TIMER;
		this.numRotations = NUM_ROTATIONS;
		this.nextLevelTimer = NEXT_LEVEL_TIMER;

		// auxiliar for animations
		this.destructionGlass = [false, 1];
		virus_in_glass = [false, false, false];

		this.map.addViruses(whichDifficulty);
		// music things
		switch (whichMusic) {
			case 0:
				this.playMusic = true;
				this.gameMusic.stop();
				this.gameMusic = AudioFX('../sounds/cool.mp3', { loop: true, volume: 0.25 });
				break;
			case 2:
				this.playMusic = false;
				this.gameMusic.stop();
				break;
			default:
				this.playMusic = true;
				this.gameMusic.stop();
				this.gameMusic = AudioFX('../sounds/game_flower_garden.wav', { loop: true, volume: 0.25 });
				break;
		}
		this.playOnceT = true;
		playOnceV = [true, true, true];

		this.virus_draw = [true, true, true];


		// texts things and rotation things
		switch (whichSpeed) {
			case 0: text_speed = "LOW"; break;
			case 1: text_speed = "MID"; break;
			default: text_speed = "HI"; break;
		}
		num_level = whichDifficulty;

		this.whichYoshi = 0;

		this.create_random_pill();
	}
}

// create random capsule (in yoshi's square)
SceneGame.prototype.create_random_pill = function () {
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

function computeAnimationPositions(state) {
	res = [0, 0];

	switch (state) {
		case 16: res = [-8, -12]; break;
		case 15: res = [-8, -12]; break;

		case 14: res = [-12, -16]; break;
		case 13: res = [-12, -16]; break;

		case 12: res = [-8, -8]; break;
		case 11: res = [-8, -8]; break;

		case 10: res = [-8, -4]; break;
		case 9: res = [-8, -4]; break;

		case 8: res = [-8, 4]; break;
		case 7: res = [-8, 4]; break;

		case 6: res = [-8, 8]; break;
		case 5: res = [-8, 8]; break;

		case 4: res = [-8, 16]; break;
		case 3: res = [-8, 16]; break;

		case 2: res = [-12, 20]; break;
		case 1: res = [-12, 20]; break;
		default: break;
	}

	return res;
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
