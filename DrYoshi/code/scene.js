

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Load bottle texture
	var bottleTexture = new Texture("imgs/botella_pequena.png");
	
	// Create bottle Image object
	this.bottle = new StaticImage(160, 48, 192, 400, bottleTexture);
	
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/tiles.png");
	
	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [2, 2], [176, 112], level01);

	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
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



