

positions_to_check = [];
positions_to_delete = [];
const viruses = [21, 22, 23];
// Tilemap. Draws a tilemap using a texture as a tilesheet.

function Tilemap(tilesheet, tileSize, blockGrid, basePos, map, difficulty_level) {
	this.tileSize = tileSize;
	this.basePos = basePos;
	this.blockGrid = blockGrid;

	this.map = map

	this.tilesheet = tilesheet;

	//this.difficulty_level = difficulty_level

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

	this.addViruses(difficulty_level)

}

Tilemap.prototype.update = function (deltaTime) {
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

			if (tileId == 21) {
				this.virusSprite1.x = this.basePos[0] + this.tileSize[0] * i
				this.virusSprite1.y = this.basePos[1] + this.tileSize[1] * j
				this.virusSprite1.draw();
			} else if (tileId == 22) {
				this.virusSprite2.x = this.basePos[0] + this.tileSize[0] * i
				this.virusSprite2.y = this.basePos[1] + this.tileSize[1] * j
				this.virusSprite2.draw();
			} else if (tileId == 23) {
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
	positions_to_break = [];

	// check the rows and columns of the positions that have changed
	// CHECK COLUMNS
	var c = positions_to_check.length;
	// if(l>0) console.log(positions_to_check);
	for (var n = 0; n < c; n++) {
		var pos = positions_to_check.pop();

		// get the index of the column to check
		var pos_column = pos % this.map.width; // OK

		// get max index of column
		var aux_col_length = pos_column + this.map.width * (this.map.height - 1); // OK 

		// CHECK COLUMNS
		this.checkLine(pos_column, aux_col_length, this.map.width);

		// get the index of the column to check
		var pos_row = pos - pos % this.map.width;
		// get max index of row
		var aux_row_length = pos_row + (this.map.width - 1);

		// CHECK ROWS
		this.checkLine(pos_row, aux_row_length, 1);
	}
	positions_to_check = [];

	// delete positions marked (FALTA LO DEL TIMER)
	var b = positions_to_break.length;
	// if(d>0) console.log(positions_to_break);
	for (var n = 0; n < b; n++) {
		var pos = positions_to_break.pop();
		var pos_type = (this.map.layers[0].data[pos] - 1) % 5;

		// change the capsules to neutral form
		if (pos_type < 20 && pos_type != 4) {
			var pos_to_change = whichPositionToChange(pos, pos_type, this.map.width);
			var color_to_change = Math.floor((this.map.layers[0].data[pos_to_change] - 1) / 5);
			this.map.layers[0].data[pos_to_change] = (color_to_change + 1) * 5;
		}

		// change to capsule broke in each color
		var color = (pos > 20)
			? 18 // virus to sprite explode 
			: Math.floor((this.map.layers[0].data[pos] - 1) / 5); // g=0,r=1,b=2 :: 16,17,18 are broke sprites
		this.map.layers[0].data[pos] = color;
		if (positions_to_delete.indexOf(pos) == -1) positions_to_delete.push(pos);
	}

	// delete all broken capsules
	var d = positions_to_delete.length;
	for (var n = 0; n < d; n++) {
		var pos = positions_to_delete.pop();
		this.map.layers[0].data[pos] = 0;
	}


}

// Computes if the left part of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveLeft = function (sprite) {
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

Tilemap.prototype.collisionMoveRight = function (sprite) {
	var x = Math.floor((sprite.x + sprite.width - 1 - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);

	for (var y = y0; y <= y1; y++) {
		if (this.map.layers[0].data[y * this.map.width + x] != 0)
			return true;
	}

	return false;
}

// Computes if the bottom of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveDown = function (sprite) {
	var y = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	var x0 = Math.floor((sprite.x - this.basePos[0]) / this.tileSize[0]);
	var x1 = Math.floor((sprite.x + sprite.width - 1 - this.basePos[0]) / this.tileSize[0]);

	if ((y < 0) || (y >= this.map.height))
		return false;
	for (var x = x0; x <= x1; x++) {
		if ((x >= 0) && (x < this.map.width))
			if (this.map.layers[0].data[y * this.map.width + x] != 0)
				return true;
	}

	return false;
}

// Given the start of the line, the length and the step (map.width in columns, 1 in rows)
// Check if there are 4 or more consecutive capsules with the same color

Tilemap.prototype.checkLine = function(pos_line, aux_length, step){
	// auxiliar variables
	var prev_color = -1, num_same_color = 1, color = -1, check = false;
	// check the line
	for (var pos_cell = pos_line; pos_cell <= aux_length; pos_cell += step) {
		// type of capsule/virus in tilemap
		var pos_type = this.map.layers[0].data[pos_cell]; // OK
		if (pos_type != 0) {
			// determine color of the type: green=0, red=1, blue=2
			color = (pos_type > 20)
				? this.map.layers[0].data[pos_cell] - 21
				: Math.floor((this.map.layers[0].data[pos_cell] - 1) / 5); // OK
			
			if (color == prev_color) {
				num_same_color++;
				if (num_same_color >= 4) {
					for (var j = 0; j < num_same_color; j++) {
						if (positions_to_break.indexOf(pos_cell - j * step) == -1) positions_to_break.push(pos_cell - j * step); // OK
					}
				}
			} else {
				num_same_color = 1;
			} 
		} else {
			color = -1;
			num_same_color = 1;
		}
		prev_color = color;
	}
}


// add new capsules to the tilemap
Tilemap.prototype.addCapsule = function (type, posx, posy) {

	// calculates position in the tilemap
	aux_x = (posx - this.basePos[0]) / 16;
	aux_y = ((posy - this.basePos[1]) / 16) * 9;

	position_capsule = aux_x + aux_y;
	if (positions_to_check.indexOf(position_capsule) == -1) positions_to_check.push(position_capsule);
	this.map.layers[0].data[position_capsule] = type + 1;

}

// generate the viruses on the tilemap
Tilemap.prototype.addViruses = function (difficulty_level) {
	var max = this.map.height * this.map.width;

	// empty the map
	for (var i = 0; i < max; i++) {
		this.map.layers[0].data[i] = 0;
	}

	var how_many_aux = 0;
	var rand_num = -1;
	var min = 13 * this.map.width - 2 * difficulty_level * this.map.width;
	
	// populates with 4*difficulty_level viruses in random positions
	while (how_many_aux < 4*difficulty_level) {

		// get a random position within the range min max
		rand_num = Math.floor(Math.random() * (max - min) + min);
		if (this.map.layers[0].data[rand_num] == 0) {
			this.map.layers[0].data[rand_num] = viruses[Math.floor(Math.random()*viruses.length)];
			how_many_aux++;
		}
	}



}

// returns the position to change given the type of capsule
function whichPositionToChange(position, type, width) {
	var res = 0;
	switch (type) {
		case 0: res = width; break;
		case 1: res = -width; break;
		case 2: res = 1; break;
		case 3: res = -1; break;
		default: break;
	}
	return position + res;
}


