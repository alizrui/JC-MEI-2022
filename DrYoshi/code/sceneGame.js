const CAPSULE_INIT_TIMER_X = 5;
const CAPSULE_INIT_TIMER_Y = 15;

var pastilla1 = 2;
var pastilla2 = 8;

var crear_pastilla = 1;

// Scene GAME . Updates and draws a single scene of the game.

function SceneGame() {
	// Load textures fondos
	var fondo_juego = new Texture("../img/fondo_juego_v1.png");
	
	// Load texture textos
	var salir = new Texture("../sprites/sprite_salir.png");
	var jugar = new Texture("../sprites/sprite_jugar.png");
	
	this.pastillasSprites = createPastillas();



	console.log(this.pastillasSprites[9])

	// Create objects
	this.imageJuego = new StaticImage(0, 0, 512, 480, fondo_juego);
	
	// Create Sprites de textos
	this.textoSalir = new Sprite(100, 355, 73, 21, 1, salir);
	this.textoJugar = new Sprite(188, 253, 125, 51, 1, jugar);
	
	this.textoSalir.addAnimation();
	this.textoSalir.addKeyframe(0, [0, 0, 73, 21]);
	this.textoSalir.addKeyframe(0, [0, 21, 73, 21]);
	this.textoSalir.setAnimation(0);

	this.textoJugar.addAnimation();
	this.textoJugar.addKeyframe(0, [0, 0, 125, 51]);
	this.textoJugar.addKeyframe(0, [0, 51, 125, 51]);
	this.textoJugar.setAnimation(0);

	console.log(this.textoJugar);

	// Loading texture to use in a TileMap
	var tilesheet = new Texture("../tiles/tiles16.png");

	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [5, 5], [184, 176], mapa_auxiliar1);

	// Store current time
	this.currentTime = 0

	this.capsuleTimerY = CAPSULE_INIT_TIMER_Y;
	this.capsuleTimerX = 0;
}


SceneGame.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Game logic
	// new capsule
	if (crear_pastilla) {
		crear_pastilla = 0;
		this.pastillasSprites[pastilla1].x = 232;
		this.pastillasSprites[pastilla1].y = 160;
		this.pastillasSprites[pastilla2].x = 248;
		this.pastillasSprites[pastilla2].y = 160;
	}
	// Move capsule down
	this.capsuleTimerY--;
	if (this.capsuleTimerY <= 0) {
		this.capsuleTimerY = CAPSULE_INIT_TIMER_Y;
		this.pastillasSprites[pastilla1].y += 16;
		this.pastillasSprites[pastilla2].y += 16;
	}

	// Move capsule left & right
	if (this.capsuleTimerX <= 0) {
		if (keyboard[37]) // KEY_LEFT
		{
			this.pastillasSprites[pastilla1].x -= 16;
			this.pastillasSprites[pastilla2].x -= 16;
			this.capsuleTimerX = CAPSULE_INIT_TIMER_X;
		}
		else if (keyboard[39]) // KEY_RIGHT
		{
			this.pastillasSprites[pastilla1].x += 16;
			this.pastillasSprites[pastilla2].x += 16;
			this.capsuleTimerX = CAPSULE_INIT_TIMER_X;
		}
	}
	else {
		this.capsuleTimerX--;
	}

	// Rotate capsule
	if (keyboard[38]) {
		keyboard[38] = false;
		
		// which capsule changes
		let x1 = this.pastillasSprites[pastilla1].x; 
		let y1 = this.pastillasSprites[pastilla1].y;
		let x2 = this.pastillasSprites[pastilla2].x; 
		let y2 = this.pastillasSprites[pastilla2].y;
		
		//compute new positions
		data1 = rotate_position(pastilla1, x1, y1);
		data2 = rotate_position(pastilla2, x2, y2);
		
		// new form of pastilla
		pastilla1 = data1[0];
		pastilla2 = data2[0];
		
		// new positions of pastilla
		this.pastillasSprites[pastilla1].x = data1[1];
		this.pastillasSprites[pastilla1].y = data1[2];
		this.pastillasSprites[pastilla2].x = data2[1];
		this.pastillasSprites[pastilla2].y = data2[2];
	}

	// Correctores de posición
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

	if (this.pastillasSprites[pastilla1].y > 448
		|| this.pastillasSprites[pastilla2].y > 448) {
		this.pastillasSprites[pastilla1].y = 160;
		this.pastillasSprites[pastilla2].y = 160
}

	// console.log(this.capsuleTimerY);
	// Salir (quitar luego)
	if (keyboard[13]) {
		keyboard[13] = false;
		whichScene = 0;
	}
	//console.log(this.pastillasSprites[pastilla1].y)
	// update sprites
	this.map.update(deltaTime);
	this.textoSalir.update(deltaTime);
}

SceneGame.prototype.draw = function () // meter argumento
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	this.imageJuego.draw();

	// Draw tilemap
	this.map.draw();

	// Draw sprites (de momento 2 y 9)
	// (232,248 pos inicial?)
	
	// console.log(this.pastillasSprites[pastilla2])
	
	this.pastillasSprites[pastilla1].draw();	
	this.pastillasSprites[pastilla2].draw();


	//Draw sprite salir (quitar en futuro)
	this.textoSalir.x = 50;
	this.textoSalir.y = 150;
	this.textoSalir.draw();

}

function createPastillas() {
	var all_pastillas = new Texture("../tiles/tiles16.png");

	let pastillasSprites = [];
	for (i = 0; i <= 32; i += 16) {
		for (j = 0; j <= 64; j += 16) {
			var pastiSprite = new Sprite(0,0,16,16,1,all_pastillas);
			pastiSprite.addAnimation();
			pastiSprite.addKeyframe(0,[j,i,16,16]);
			pastillasSprites.push(pastiSprite);
		}
	}
	for (i = 0; i <= 32; i += 16) {
		var pastiSprite = new Sprite(0,0,16,16,1,all_pastillas);
		pastiSprite.addAnimation();
		pastiSprite.addKeyframe(0,[i,48,16,16]);
		pastillasSprites.push(pastiSprite);
	}

	return pastillasSprites;
}

function rotate_position(number, x, y) {
	number_rotated = 0
	let newx = 0;
	let newy = 0;

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





