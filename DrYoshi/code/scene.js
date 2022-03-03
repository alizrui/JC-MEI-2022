
const VIRUS_ANIMATION = 0;

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Load textures
	var fondo_juego = new Texture("../img/fondo_juego_v1.png");
	var menu_principal = new Texture("../img/menu_principal.png");
	var fondo_creditos = new Texture("../img/fondo_creditos.png");
	var instrucciones = new Texture("../img/instrucciones.png");
		
	// Create objects
	this.fjuego = new StaticImage(0, 0, 512, 480, fondo_juego);
	this.mprincipal = new StaticImage(0, 0, 512, 480, menu_principal);
	this.fcreditos = new StaticImage(0, 0, 512, 480, fondo_creditos);
	this.instr = new StaticImage(0, 0, 512, 480, instrucciones);
	
	
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("../tiles/tiles16.png");
	
	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [5,5], [184, 288], tiles_yoshi_16);

	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;

	this.map.update(deltaTime)
	// this.virusSprite1.update(deltaTime)
}

Scene.prototype.draw = function () // meter argumento
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	// Draw scenes (if else)
	this.fondo_juego.draw();

	// Draw tilemap
	this.map.draw();
}



