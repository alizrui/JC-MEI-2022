// Scene INSTRUCTIONS. Updates and draws a single scene of the game.

function SceneInstr() {
	// Load textures fondos
	var instrucciones = new Texture("../img/instrucciones.png");

	// Load texture textos
	var salir = new Texture("../sprites/sprite_salir.png");
	var instr_anim = new Texture("../sprites/animacion_creditos.png");

	// Create objects
	this.imageInstr = new StaticImage(0, 0, 512, 480, instrucciones);

	// Create Sprites de textos
	this.textoSalir = new Sprite(100, 355, 73, 21, 1, salir);
	this.animacionInstr = new Sprite(350,175, 16,64, 1, instr_anim);
	
	this.textoSalir.addAnimation();
	this.textoSalir.addKeyframe(0, [0, 0, 73, 21]);
	this.textoSalir.addKeyframe(0, [0, 21, 73, 21]);
	this.textoSalir.setAnimation(0);

	this.animacionInstr.addAnimation();
	this.animacionInstr.addKeyframe(0, [0, 0,  16, 64]);
	this.animacionInstr.addKeyframe(0, [0, 64,  16, 64]);
	this.animacionInstr.setAnimation(0);
	
	// Store current time
	this.currentTime = 0
}


SceneInstr.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Game logic
	if (keyboard[13]) {
		keyboard[13] = false;
		whichScene = 0;
	}	

	// Update sprites
	this.textoSalir.update(deltaTime);
	this.animacionInstr.update(deltaTime);
	
}

SceneInstr.prototype.draw = function () // meter argumento
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	/* Draw Scenes -> whichScene is drawed
		0: menu principal
		1: juego
		2: instrucciones 
		3: créditos
	*/
	this.imageInstr.draw();

	// Draw sprite salir

	this.textoSalir.x = 100;
	this.textoSalir.y = 355;
	this.textoSalir.draw();

	// draw animacion instr
	this.animacionInstr.draw();

}



