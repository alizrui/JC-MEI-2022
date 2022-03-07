
// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;

var scene = new Scene();
var previousTimestamp;
var keyboard = [];
var interacted;
var whichScene = 0;
var whichButton = 0;

// Control keyboard events

function keyDown(keycode) {
	if (keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = true;
}

function keyUp(keycode) {
	if (keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = false;
}

function keyEnter(keycode) {
	if (keycode.which == 13){
		whichScene = whichButton+1;
	}
		
}

function click() {
	interacted = true;
}

// Initialization

function init() {
	for (var i = 0; i < 256; i++)
		keyboard.push(false);
	document.body.addEventListener('keydown', keyDown);
	document.body.addEventListener('keyup', keyUp);
	document.body.addEventListener('click', click);
	previousTimestamp = performance.now();
	interacted = false;
}

// Game loop: Update, draw, and request a new frame

function frameUpdate(timestamp) {
	var deltaTime = timestamp - previousTimestamp;
	if (deltaTime > TIME_PER_FRAME) {

		// mantener esto aquí ??
		if (keyboard[40]) {
			keyboard[40] = false; 
			if (whichScene == 0) {
				whichButton++;
				if (whichButton > 2) {
					whichButton = 0;
				}
			}
			
		} else if (keyboard[38]) {
			keyboard[38] = false;
			if (whichScene == 0) {
				whichButton--;
				if (whichButton < 0) {
					whichButton = 2;
				}
			}
		} else if (keyboard[13]){
			keyboard[13] = false;
			if(whichScene == 0){
				whichScene = whichButton + 1;
			} else {
				whichScene = 0;
			}
		}
	
		scene.update(TIME_PER_FRAME, whichScene);
		previousTimestamp += TIME_PER_FRAME
		scene.draw(whichScene, whichButton);
	}
	window.requestAnimationFrame(frameUpdate)
}

// Init and launch game loop
init();
frameUpdate(previousTimestamp);

