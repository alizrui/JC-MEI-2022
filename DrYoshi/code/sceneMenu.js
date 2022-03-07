// Scene MENU. Updates and draws a single scene of the game.

function SceneMenu() {
	// Load textures fondos
	var menu_principal = new Texture("../img/menu_principal.png");
	
	// Load texture textos
	var creditos = new Texture("../sprites/sprite_creditos.png");
	var jugar = new Texture("../sprites/sprite_jugar.png");
	var instr = new Texture("../sprites/sprite_instr.png");
	
	// Create objects
	this.imagePrincipal = new StaticImage(0, 0, 512, 480, menu_principal);
	
	// Create Sprites de textos
	this.textoCreditos = new Sprite(187, 374, 160, 41, 1, creditos);
	this.textoJugar = new Sprite(188, 253, 125, 51, 1, jugar);
	this.textoInstr = new Sprite(189, 317, 221, 36, 1, instr);
	
	this.textoCreditos.addAnimation();
	this.textoCreditos.addKeyframe(0, [0, 0, 160, 41]);
	this.textoCreditos.addKeyframe(0, [0, 41, 160, 41]);
	this.textoCreditos.setAnimation(0);

	this.textoJugar.addAnimation();
	this.textoJugar.addKeyframe(0, [0, 0, 125, 51]);
	this.textoJugar.addKeyframe(0, [0, 51, 125, 51]);
	this.textoJugar.setAnimation(0);

	this.textoInstr.addAnimation();
	this.textoInstr.addKeyframe(0, [0, 0, 221, 36]);
	this.textoInstr.addKeyframe(0, [0, 36, 221, 36]);
	this.textoInstr.setAnimation(0);

	// Loading texture to use in a TileMap

	// Create tilemap

	// Store current time
	this.currentTime = 0
}


SceneMenu.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Select diferent scenes
	if (keyboard[40]) {
		keyboard[40] = false;
		whichButton++;
		if (whichButton > 2) whichButton = 0;

	} else if (keyboard[38]) {
		keyboard[38] = false;
		whichButton--;
		if (whichButton < 0) whichButton = 2;

	} else if (keyboard[13]) {
		keyboard[13] = false;
		whichScene = whichButton + 1;
	}

	// update sprites
	this.textoJugar.update(deltaTime);
	this.textoInstr.update(deltaTime);
	this.textoCreditos.update(deltaTime);
	}

SceneMenu.prototype.draw = function () // meter argumento
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
	this.imagePrincipal.draw();

	// draw sprites
	if (whichButton == 0) {
		this.textoJugar.draw();
	} else if (whichButton == 1) {
		this.textoInstr.draw();
	} else {
		this.textoCreditos.draw();
	}

	
}



