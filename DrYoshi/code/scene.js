
const VIRUS_ANIMATION = 0;

// Scene. Updates and draws a single scene of the game.

function Scene() {
	// Load textures fondos
	var fondo_juego = new Texture("../img/fondo_juego_v1.png");
	var menu_principal = new Texture("../img/menu_principal.png");
	var fondo_creditos = new Texture("../img/fondo_creditos.png");
	var instrucciones = new Texture("../img/instrucciones.png");

	// Load texture textos
	var salir = new Texture("../sprites/sprite_salir.png");
	var creditos = new Texture("../sprites/sprite_creditos.png");
	var jugar = new Texture("../sprites/sprite_jugar.png");
	var instr = new Texture("../sprites/sprite_instr.png");
	var instr_anim = new Texture("../sprites/animacion_creditos.png");

	// Create objects
	this.imageJuego = new StaticImage(0, 0, 512, 480, fondo_juego);
	this.imagePrincipal = new StaticImage(0, 0, 512, 480, menu_principal);
	this.imageCreditos = new StaticImage(0, 0, 512, 480, fondo_creditos);
	this.imageInstr = new StaticImage(0, 0, 512, 480, instrucciones);

	// Create Sprites de textos
	this.textoSalir = new Sprite(100, 355, 73, 21, 1, salir);
	this.textoCreditos = new Sprite(187, 374, 160, 41, 1, creditos);
	this.textoJugar = new Sprite(188, 253, 125, 51, 1, jugar);
	this.textoInstr = new Sprite(189, 317, 221, 36, 1, instr);
	this.animacionInstr = new Sprite(350,175, 16,64, 1, instr_anim);
	
	
	this.textoSalir.addAnimation();
	this.textoSalir.addKeyframe(0, [0, 0, 73, 21]);
	this.textoSalir.addKeyframe(0, [0, 21, 73, 21]);
	this.textoSalir.setAnimation(0);

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

	this.animacionInstr.addAnimation();
	this.animacionInstr.addKeyframe(0, [0, 0,  16, 64]);
	this.animacionInstr.addKeyframe(0, [0, 64,  16, 64]);
	this.animacionInstr.setAnimation(0);


	// Loading texture to use in a TileMap
	var tilesheet = new Texture("../tiles/tiles16.png");

	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [5, 5], [184, 288], tiles_yoshi_16);

	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function (deltaTime, whichScene) {
	// Keep track of time
	this.currentTime += deltaTime;

	if (whichScene == 0){
		this.textoJugar.update(deltaTime);
		this.textoInstr.update(deltaTime);
		this.textoCreditos.update(deltaTime);
	}
	else if (whichScene == 1) {
		this.map.update(deltaTime);
		this.textoSalir.update(deltaTime);
		
	} else if (whichScene == 2){
		this.textoSalir.update(deltaTime);
		this.animacionInstr.update(deltaTime);
	} else {
		this.textoSalir.update(deltaTime);
	}
	// this.virusSprite1.update(deltaTime)
}

Scene.prototype.draw = function (whichScene, whichButton) // meter argumento
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
	if (whichScene == 0) {
		this.imagePrincipal.draw();

		// draw sprites
		if(whichButton == 0){
			this.textoJugar.draw();
		} else if (whichButton == 1) {
			this.textoInstr.draw();		
		} else { 
			this.textoCreditos.draw();
		}
		
	} else if (whichScene == 1) {
		this.imageJuego.draw();

		// Draw tilemap
		this.map.draw();

		//Draw sprite salir (quitar en futuro)
		this.textoSalir.x = 50;
		this.textoSalir.y = 150;
		this.textoSalir.draw();

	} else if (whichScene == 2) {	
		this.imageInstr.draw();

		// Draw sprite salir

		this.textoSalir.x = 100;
		this.textoSalir.y = 355;
		this.textoSalir.draw();

		// draw animacion instr
		this.animacionInstr.draw();
	} else {
		this.imageCreditos.draw();

		// Draw sprite salir
		this.textoSalir.x = 100;
		this.textoSalir.y = 355;
		this.textoSalir.draw();
	}


}



