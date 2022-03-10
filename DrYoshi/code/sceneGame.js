const CAPSULE_INIT_TIMER_X = 5;
const CAPSULE_INIT_TIMER_Y = 15;

var pastilla1 = 2;
var pastilla2 = 9;

var first_auxiliar = 1;

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
	this.map = new Tilemap(tilesheet, [16, 16], [5, 5], [184, 288], tiles_yoshi_16);

	// Store current time
	this.currentTime = 0

	this.capsuleTimerY = CAPSULE_INIT_TIMER_Y;
	this.capsuleTimerX = 0;
}


SceneGame.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Game logic
	// Move capsule down
	this.capsuleTimerY--;
	if (this.capsuleTimerY <= 0) {
		this.capsuleTimerY = CAPSULE_INIT_TIMER_Y;
		this.pastillasSprites[pastilla1].y += 16;
		this.pastillasSprites[pastilla2].y += 16;
	}

	if (this.pastillasSprites[pastilla1].y > 448) {
		this.pastillasSprites[pastilla1].y = 160;
		this.pastillasSprites[pastilla2].y = 160
	}

	// Move capsule left & right
	if(this.capsuleTimerX <= 0)
	{
		if(keyboard[37]) // KEY_LEFT
		{
			if(this.pastillasSprites[pastilla1].x >= 200){
				this.pastillasSprites[pastilla1].x -= 16;
				this.pastillasSprites[pastilla2].x -= 16;
			}
			this.capsuleTimerX = CAPSULE_INIT_TIMER_X;
		}
		else if(keyboard[39]) // KEY_RIGHT
		{
			if(this.pastillasSprites[pastilla2].x <= 296){
				this.pastillasSprites[pastilla1].x += 16;
				this.pastillasSprites[pastilla2].x += 16;
			}
			this.capsuleTimerX = CAPSULE_INIT_TIMER_X;
		}
	}
	else {
		this.capsuleTimerX--;
	}
	// console.log(this.capsuleTimerY);
	// Salir (quitar luego)
	if (keyboard[13]) {
		keyboard[13] = false;
		whichScene = 0;
	}
	console.log(this.pastillasSprites[pastilla1].y)
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
	//this.map.draw();

	// Draw sprites (de momento 2 y 9)
	// (232,248 pos inicial?)
	if(first_auxiliar){
		first_auxiliar = 0;
		this.pastillasSprites[pastilla1].x = 232; 
		this.pastillasSprites[pastilla1].y = 160;
		this.pastillasSprites[pastilla2].x = 248;
		this.pastillasSprites[pastilla2].y = 160;
	}
	// console.log(this.pastillasSprites[pastilla2])
	
	this.pastillasSprites[pastilla1].draw();	
	this.pastillasSprites[pastilla2].draw();


	//Draw sprite salir (quitar en futuro)
	this.textoSalir.x = 50;
	this.textoSalir.y = 150;
	this.textoSalir.draw();

}

function createPastillas() {
	let colors = ["green", "red", "blue"];
	let p_types = ["up","down","left","right","neutral","broke"];
	let name = [];
	let pastillasSprites = [];
	for (const color of colors){
		for(const p_type of p_types){
			name = color+"_"+p_type+".png";
			var pastilla = new Texture("../sprites/pastillas/"+name);
			var pastiSprite = new Sprite(0,0,16,16,1,pastilla);
			pastiSprite.addAnimation();
			pastiSprite.addKeyframe(0,[0,0,16,16]);
			pastillasSprites.push(pastiSprite)
		}
	}
	return pastillasSprites;
}



