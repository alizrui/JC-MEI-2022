

positions_to_check = [];
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
				this.virusSprite1.x = this.basePos[0] + this.tileSize[0] * i
				this.virusSprite1.y = this.basePos[1] + this.tileSize[1] * j
				this.virusSprite1.draw();
			} else if (tileId == 22){
				this.virusSprite2.x = this.basePos[0] + this.tileSize[0] * i
				this.virusSprite2.y = this.basePos[1] + this.tileSize[1] * j
				this.virusSprite2.draw();
			} else if (tileId == 23){
				this.virusSprite3.x = this.basePos[0] + this.tileSize[0] * i
				this.virusSprite3.y = this.basePos[1] + this.tileSize[1] * j
				this.virusSprite3.draw();
			}

			else if (tileId != 0) {
				context.drawImage(this.tilesheet.img, tilePositions[tileId - 1][0], tilePositions[tileId - 1][1], blockSize[0], blockSize[1],
					this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j, blockSize[0], blockSize[1]);
			}
		}

	// this.map.layers[0].data[i];
	// delete 4 or more consecutive capsules
	positions_to_delete = []; 

	// check the rows and columns of the positions that have changed

	var l = positions_to_check.length;
	for (var n = 0; n < l; n++) {
		var pos = positions_to_check.pop();

		// CHECK COLUMNS
		// get the index of the column to check
		var pos_column = pos % this.map.width; // OK

		// get max index of column
		var aux_col_length = pos_column + this.map.width * (this.map.height - 1); // OK 

		// auxiliar variables
		var prev_color = -1, num_same_color = 1, color = -1;
		
		// check the column
		for (var pos_cell = pos_column; pos_cell <= aux_col_length; pos_cell += this.map.width) {
			// type of capsule/virus in tilemap
			var pos_type = this.map.layers[0].data[pos_cell]; // OK
			var check = false;
			if (pos_type != 0) {
				// determine color of the type
				// green=0, red=1, blue=2
				color = (pos_type > 20)
					? this.map.layers[0].data[pos_cell] - 21
					: Math.floor((this.map.layers[0].data[pos_cell] - 1) / 5); // OK
				// colors_in_col.push(color);
				if (color == prev_color) {
					num_same_color++;
				} else { check = true; }

			} else { 
				check = true; 
				color = -1;
			} // needs check ()

			if (pos_cell == aux_col_length) {
				check = true;
				pos_cell += this.map.width; // truquito 
			} // only in last cell of column

			// check if there are 4 or more consecutive
			if (check) {
				if(num_same_color >= 4) {
					for (var j = num_same_color; j > 0; j--) {
						positions_to_delete.push(pos_cell - j * this.map.width); // OK
					}
				}
				num_same_color = 1;
			} 
			prev_color = color;
		}

		// CHECK ROWS
		// get the index of the column to check
		var pos_row = pos - pos % this.map.width;
		// get max index of row
		var aux_row_length = pos_row + (this.map.width - 1); 

		// auxiliar variables
		var prev_color = -1, num_same_color = 1, color = -1;
		// check the column
		for (var pos_cell = pos_row; pos_cell <= aux_row_length; pos_cell += 1) { 
			// type of capsule/virus in tilemap
			var pos_type = this.map.layers[0].data[pos_cell]; // OK
			var check = false;
			if (pos_type != 0) {
				// determine color of the type
				// green=0, red=1, blue=2
				color = (pos_type > 20)
					? this.map.layers[0].data[pos_cell] - 21
					: Math.floor((this.map.layers[0].data[pos_cell] - 1) / 5); // OK
				// colors_in_col.push(color);
				if (color == prev_color) {
					num_same_color++;
				} else { check = true; }

			} else { 
				check = true; 
				color = -1;
			} // needs check ()

			if (pos_cell == aux_row_length) {
				check = true;
				pos_cell += 1; // truquito 
			} // only in last cell of row

			// check if there are 4 or more consecutive
			if (check) {
				if(num_same_color >= 4) {
					for (var j = num_same_color; j > 0; j--) {
						positions_to_delete.push(pos_cell - j * 1); // OK
					}
				}
				num_same_color = 1;
			} 
			prev_color = color;
		}

	}
	positions_to_check = [];

	// delete positions marked
	var d = positions_to_delete.length;
	for (var n = 0; n < d; n++){
		var p = positions_to_delete.pop();
		this.map.layers[0].data[p] = 0;
	}	
}

// Computes if the left part of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveLeft = function(sprite)
{
	var x = Math.floor((sprite.x - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	
	for (var y = y0; y <= y1; y++) {
		if (this.map.layers[0].data[y * this.map.width + x] != 0)
			return true;
	}

	return false;
}

// Computes if the right part of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveRight = function(sprite)
{
	var x = Math.floor((sprite.x + sprite.width - 1 - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	
	for(var y=y0; y<=y1; y++)
	{
		if(this.map.layers[0].data[y * this.map.width + x] != 0)
			return true;
	}
	
	return false;
}

// Computes if the bottom of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveDown = function(sprite)
{
	var y = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	var x0 = Math.floor((sprite.x - this.basePos[0]) / this.tileSize[0]);
	var x1 = Math.floor((sprite.x + sprite.width - 1 - this.basePos[0]) / this.tileSize[0]);
	
	if((y < 0) || (y >= this.map.height))
		return false;
	for(var x=x0; x<=x1; x++)
	{
		if((x >= 0) && (x < this.map.width))
			if(this.map.layers[0].data[y * this.map.width + x] != 0)
				return true;
	}
	
	return false;
}


// add new capsules to the tilemap
Tilemap.prototype.addCapsule = function(type, posx, posy){
	
	// calculates position in the tilemap
	aux_x = (posx - this.basePos[0]) / 16; 
	aux_y = ((posy - this.basePos[1]) / 16) * 9;

	positions_to_check.push(aux_x + aux_y);
	this.map.layers[0].data[aux_x + aux_y] = type + 1;

}


