
// Scene CREDITOS. Updates and draws a single scene of the game.

function SceneCreditos() {
	// Load textures fondos
	var fondo_creditos = new Texture("../img/fondo_creditos.png");
	
	// Load texture textos
	var salir = new Texture("../sprites/sprite_salir.png");
	
	// Create objects
	this.imageCreditos = new StaticImage(0, 0, 512, 480, fondo_creditos);
	
	// Create Sprites de textos
	this.textoSalir = new Sprite(100, 355, 73, 21, 1, salir);
	
	this.textoSalir.addAnimation();
	this.textoSalir.addKeyframe(0, [0, 0, 73, 21]);
	this.textoSalir.addKeyframe(0, [0, 21, 73, 21]);
	this.textoSalir.setAnimation(0);

	// Store current time
	this.currentTime = 0
}


SceneCreditos.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Game logic
	if (keyboard[13]){
		keyboard[13] = false;
		whichScene = 0;
	}	

	// Update sprites
	this.textoSalir.update(deltaTime+8);
}

SceneCreditos.prototype.draw = function () // meter argumento
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	this.imageCreditos.draw();

	// Draw sprite salir
	this.textoSalir.x = 100;
	this.textoSalir.y = 355;
	this.textoSalir.draw();
}



