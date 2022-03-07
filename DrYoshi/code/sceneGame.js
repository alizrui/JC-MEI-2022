// Scene GAME . Updates and draws a single scene of the game.

function SceneGame() {
	// Load textures fondos
	var fondo_juego = new Texture("../img/fondo_juego_v1.png");
	
	// Load texture textos
	var salir = new Texture("../sprites/sprite_salir.png");
	var jugar = new Texture("../sprites/sprite_jugar.png");
	
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

	// Loading texture to use in a TileMap
	var tilesheet = new Texture("../tiles/tiles16.png");

	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [5, 5], [184, 288], tiles_yoshi_16);

	// Store current time
	this.currentTime = 0
}


SceneGame.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Game logic
	if (keyboard[13]){
		keyboard[13] = false;
		whichScene = 0;
	}	

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

	//Draw sprite salir (quitar en futuro)
	this.textoSalir.x = 50;
	this.textoSalir.y = 150;
	this.textoSalir.draw();

}



