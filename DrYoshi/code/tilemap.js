

// Tilemap. Draws a tilemap using a texture as a tilesheet.

function Tilemap(tilesheet, tileSize, blockGrid, basePos, map) {
	this.tileSize = tileSize;
	this.basePos = basePos;
	this.blockGrid = blockGrid;
	this.map = map

	this.tilesheet = tilesheet;

	// initialization of sprites
	var virus1 = new Texture("../sprites/virus1_16.png");
	var virus2 = new Texture("../sprites/virus2_16.png");
	var virus3 = new Texture("../sprites/virus3_16.png");

	this.virusSprite1 = new Sprite(0, 0, 16, 16, 1, virus1);
	this.virusSprite2 = new Sprite(0, 0, 16, 16, 1, virus2);
	this.virusSprite3 = new Sprite(0, 0, 16, 16, 1, virus3);

	this.virusSprite1.addAnimation();
	this.virusSprite2.addAnimation();
	this.virusSprite3.addAnimation();

	this.virusSprite1.addKeyframe(VIRUS_ANIMATION, [0, 0, 16, 16]);
	this.virusSprite1.addKeyframe(VIRUS_ANIMATION, [0, 16, 16, 16]);

	this.virusSprite2.addKeyframe(VIRUS_ANIMATION, [0, 0, 16, 16]);
	this.virusSprite2.addKeyframe(VIRUS_ANIMATION, [0, 16, 16, 16]);

	this.virusSprite3.addKeyframe(VIRUS_ANIMATION, [0, 0, 16, 16]);
	this.virusSprite3.addKeyframe(VIRUS_ANIMATION, [0, 16, 16, 16]);

	this.virusSprite1.setAnimation(VIRUS_ANIMATION);
	this.virusSprite2.setAnimation(VIRUS_ANIMATION);
	this.virusSprite3.setAnimation(VIRUS_ANIMATION);
}

Tilemap.prototype.update = function(deltaTime) {
	this.virusSprite1.update(deltaTime);
	this.virusSprite2.update(deltaTime);
	this.virusSprite3.update(deltaTime);
}

Tilemap.prototype.draw = function () {
	// Only draw if tilesheet texture already loaded
	if (!this.tilesheet.isLoaded())
		return;

	// Size of each block in pixels
	blockSize = [this.tilesheet.width() / this.blockGrid[0], this.tilesheet.height() / this.blockGrid[1]];

	// Compute block positions in tilesheet
	var tilePositions = [];
	for (var y = 0, tileId = 0; y < this.blockGrid[1]; y++)
		for (var x = 0; x < this.blockGrid[0]; x++, tileId++)
			tilePositions.push([x * blockSize[0], y * blockSize[1]]);

	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Draw the map
	var tileId;
	context.imageSmoothingEnabled = false;
	for (var j = 0, pos = 0; j < this.map.height; j++)
		for (var i = 0; i < this.map.width; i++, pos++) {
			tileId = this.map.layers[0].data[pos];
			
			if(tileId == 21){
				this.virusSprite1.x = tilePositions[tileId - 1][0];
				this.virusSprite1.y = tilePositions[tileId - 1][1];
				this.virusSprite1.draw();
			} else if (tileId == 22){
				this.virusSprite2.x = tilePositions[tileId - 1][0];
				this.virusSprite2.y = tilePositions[tileId - 1][1];
				this.virusSprite2.draw();
			} else if (tileId == 23){
				this.virusSprite3.x = tilePositions[tileId - 1][0];
				this.virusSprite3.y = tilePositions[tileId - 1][1];
				this.virusSprite3.draw();
			}

			else if (tileId != 0) {
				context.drawImage(this.tilesheet.img, tilePositions[tileId - 1][0], tilePositions[tileId - 1][1], blockSize[0], blockSize[1],
					this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j, blockSize[0], blockSize[1]);
			}
		}
}

