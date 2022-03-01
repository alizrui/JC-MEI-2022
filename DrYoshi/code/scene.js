
const VIRUS_ANIMATION = 0;

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Load bottle texture
	var bottleTexture = new Texture("../img/botella.png");
	
	// Create bottle Image object
	this.bottle = new StaticImage(0, 0, 160, 348, bottleTexture);
	
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("../tiles/tiles16.png");
	
	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [5,5], [16, 100], tiles_yoshi_16);

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

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	// Draw bottle
	this.bottle.draw();

	// Draw tilemap
	this.map.draw();
}



