
positions_to_delete = [];
positions_to_break = [];
stoppedTilemap = false;

const pos_viruses = [21, 22, 23];
// Tilemap. Draws a tilemap using a texture as a tilesheet.

function Tilemap(tilesheet, tileSize, blockGrid, basePos, map) {
	this.tileSize = tileSize;
	this.basePos = basePos;
	this.blockGrid = blockGrid;

	this.map = map

	this.tilesheet = tilesheet;

	// initialization of sprites
	var virus = new Texture("../sprites/virus.png");

	this.viruses = [0, 0, 0];

	for (var i = 0; i < 3; i++) {
		this.viruses[i] = new Sprite(0, 0, 16, 16, 1, virus);
		this.viruses[i].addAnimation();
		this.viruses[i].addKeyframe(VIRUS_ANIMATION, [i * 16, 0, 16, 16]);
		this.viruses[i].addKeyframe(VIRUS_ANIMATION, [i * 16, 16, 16, 16]);
		this.viruses[i].setAnimation(VIRUS_ANIMATION);
	}

	// this.addViruses(difficulty_level)

}

Tilemap.prototype.update = function (deltaTime) {
	for (var i = 0; i < 3; i++) {
		this.viruses[i].update(deltaTime);
	}
	

	// delete positions marked 
	var b = positions_to_break.length;

	// if(d>0) console.log(positions_to_break);
	for (var n = 0; n < b; n++) {
		var pos = positions_to_break.pop();
		var pos_type = (this.map.layers[0].data[pos] - 1);

		// change the capsules to neutral form
		if (pos_type < 20 && pos_type % 5 != 4) {
			var pos_to_change = whichPositionToChange(pos, pos_type % 5, this.map.width);
			var color_to_change = Math.floor((this.map.layers[0].data[pos_to_change] - 1) / 5);
			this.map.layers[0].data[pos_to_change] = (color_to_change + 1) * 5;
		}

		// change to capsule broke in each color
		var color = (pos_type > 20)
			? 18 // virus to sprite explode 
			: Math.floor((this.map.layers[0].data[pos] - 1) / 5); // g=0,r=1,b=2 :: 16,17,18 are broke sprites
		this.map.layers[0].data[pos] = color;
		if (positions_to_delete.indexOf(pos) == -1) positions_to_delete.push(pos);
	}

	// delete all broken capsules
	var d = positions_to_delete.length;
	if (d) { console.log(positions_to_delete); } // DEBUG
	for (var n = 0; n < d; n++) {
		var pos = positions_to_delete.pop();
		this.map.layers[0].data[pos] = 0;
	}
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

			// draw sprites of virus (positions 21, 22, 23)
			if (tileId > 20 && tileId < 24) {
				this.viruses[tileId - 21].x = this.basePos[0] + this.tileSize[0] * i;
				this.viruses[tileId - 21].y = this.basePos[1] + this.tileSize[1] * j;
				this.viruses[tileId - 21].draw();
			} 
			if (tileId > 0 && tileId != 20 && tileId != 24 && tileId != 25) { // DEBUGGING, FAKE SOLUTION
				context.drawImage(this.tilesheet.img, tilePositions[tileId - 1][0], tilePositions[tileId - 1][1], blockSize[0], blockSize[1],
					this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j, blockSize[0], blockSize[1]);
			}
		}
}

// Computes if the left part of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveLeft = function (sprite) {
	var x = Math.floor((sprite.x - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor(((sprite.y-2) - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor(((sprite.y-2) + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);

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
	var y0 = Math.floor(((sprite.y-2) - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor(((sprite.y-2) + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);

	for (var y = y0; y <= y1; y++) {
		if (this.map.layers[0].data[y * this.map.width + x] != 0)
			return true;
	}

	return false;
}

// Computes if the bottom of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveDown = function (sprite) {
	var y = Math.floor(((sprite.y-2) + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
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


// add new capsules to the tilemap
Tilemap.prototype.addCapsule = function (type1, posx1, posy1, type2, posx2, posy2) {	
	stopped = true;
	stoppedTilemap = true;

	// calculates positions in the tilemap
	aux_x1 = (posx1 - this.basePos[0]) / 16;
	aux_y1 = (((posy1-2) - this.basePos[1]) / 16) * this.map.width ;

	aux_x2 = (posx2 - this.basePos[0]) / 16;
	aux_y2 = (((posy2-2) - this.basePos[1]) / 16) * this.map.width ;

	position_capsule1 = aux_x1 + aux_y1;
	position_capsule2 = aux_x2 + aux_y2;

	this.map.layers[0].data[position_capsule1] = type1 + 1;
	this.map.layers[0].data[position_capsule2] = type2 + 1;

	// delete 4 or more consecutive capsules
	// check ALL THE ROWS AND COLUMNS
	// check THE COLUMNS
	for (var i = 0; i < this.map.width; i++){ // 0, 1, .. 7, 8
		this.checkLine(i, i + this.map.width * (this.map.height - 1), this.map.width);
	}
		
	// CHECK THE ROWS 
	for (var i = 0; i < this.map.height * this.map.width; i += this.map.width) { // 0, 9, ..., 152
		this.checkLine(i, i + (this.map.width - 1), 1);
	}

	//stopped = false;
}


// Given the start of the line, the length and the step (map.width in columns, 1 in rows)
// Check if there are 4 or more consecutive capsules with the same color

Tilemap.prototype.checkLine = function (pos_line, aux_length, step) {
	// auxiliar variables
	var prev_color = -1, num_same_color = 1, color = -1;
	// check the line
	for (var pos_cell = pos_line; pos_cell <= aux_length; pos_cell += step) {
		// type of capsule/virus in tilemap
		var pos_type = this.map.layers[0].data[pos_cell]; // OK
		if (pos_type != 0) {
			// determine color of the type: green=0, red=1, blue=2
			color = (pos_type > 20)
				? pos_type - 21
				: Math.floor((pos_type - 1) / 5); // OK

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
	while (how_many_aux < 4 * difficulty_level) {

		// get a random position within the range min max
		rand_num = Math.floor(Math.random() * (max - min) + min);
		if (this.map.layers[0].data[rand_num] == 0) {
			this.map.layers[0].data[rand_num] = pos_viruses[Math.floor(Math.random() * pos_viruses.length)];
			how_many_aux++;
		}
	}

	this.addCapsule(-1,-1,-1,-1,-1,-1); // DEBUG
	stopped = false;
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


