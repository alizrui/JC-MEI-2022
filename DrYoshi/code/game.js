// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;
const VIRUS_ANIMATION = 0;

var sceneMenu = new SceneMenu();
var sceneGame = new SceneGame();
var sceneInstr = new SceneInstr();
var sceneCreditos = new SceneCreditos();
var sceneSelection = new SceneSelection();

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
		if(whichScene == 0){
			sceneMenu.update(TIME_PER_FRAME);
			previousTimestamp += TIME_PER_FRAME
			sceneMenu.draw();
		} else if(whichScene == 1){
			sceneSelection.update(TIME_PER_FRAME);
			previousTimestamp += TIME_PER_FRAME
			sceneSelection.draw();	
		} else if(whichScene == 2){
			sceneInstr.update(TIME_PER_FRAME);
			previousTimestamp += TIME_PER_FRAME
			sceneInstr.draw();
		} else if (whichScene == 3) {
			sceneCreditos.update(TIME_PER_FRAME);
			previousTimestamp += TIME_PER_FRAME
			sceneCreditos.draw();
		} else {
			sceneGame.update(TIME_PER_FRAME);
			previousTimestamp += TIME_PER_FRAME
			sceneGame.draw();		
		}
	}
	window.requestAnimationFrame(frameUpdate)
}

// Init and launch game loop
init();
frameUpdate(previousTimestamp);

