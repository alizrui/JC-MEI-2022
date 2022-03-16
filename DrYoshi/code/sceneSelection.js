
// Scene SELECTION. Updates and draws a single scene of the game.

function SceneSelection() {
	// Load textures fondos
	var fondo_selection = new Texture("../img/fondo_selection.png");
	
	// Load texture textos
	var texture_sprites = new Texture("../sprites/sprites_selection.png");
	
	// Create objects
	this.imageCreditos = new StaticImage(0, 0, 512, 480, fondo_selection);
	
	// Create ALL Sprites new Sprite(x,y,width,height,1,texture_sprites)
	this.virusLevel =	new Sprite(90, 80, 164, 21, 1, texture_sprites);
	this.velocidad  =	new Sprite(90, 180, 133, 21, 1, texture_sprites);
	this.musica     =   new Sprite(90, 280, 89, 21, 1, texture_sprites);
	this.salir 		=	new Sprite(90, 380, 73, 21, 1, texture_sprites);
	this.sprite1 	=	new Sprite(120, 130, 13, 19, 1, texture_sprites);
	this.sprite2 	= 	new Sprite(170, 130, 13, 19, 1, texture_sprites);
	this.sprite3 	=	new Sprite(220, 130, 13, 19, 1, texture_sprites);
	this.sprite4 	=	new Sprite(270, 130, 15, 19, 1, texture_sprites);
	this.sprite5 	=	new Sprite(320, 130, 13, 19, 1, texture_sprites);
	this.low 		=	new Sprite(120, 230, 44, 21, 1, texture_sprites);
	this.med 		=	new Sprite(220, 230, 43, 21, 1, texture_sprites);
	this.hi 		=	new Sprite(320, 230, 28, 21, 1, texture_sprites);
	this.cool 		=	new Sprite(120, 330, 58, 21, 1, texture_sprites);
	this.chill 		=	new Sprite(220, 330, 73, 21, 1, texture_sprites);
	this.off 		=	new Sprite(320, 330, 45, 21, 1, texture_sprites);
	

	this.virusLevel.addAnimation();
	this.velocidad.addAnimation();  
	this.musica.addAnimation();     
	this.salir.addAnimation(); 		
	this.sprite1.addAnimation(); 	
	this.sprite2.addAnimation(); 	
	this.sprite3.addAnimation(); 	
	this.sprite4.addAnimation(); 	
	this.sprite5.addAnimation(); 	
	this.low.addAnimation(); 		
	this.med.addAnimation(); 		
	this.hi.addAnimation(); 		
	this.cool.addAnimation(); 		
	this.chill.addAnimation(); 		
	this.off.addAnimation(); 	
	
	this.virusLevel.addKeyframe(0, [0, 0, 164, 21]);
	this.velocidad.addKeyframe(0,  [0, 21, 133, 21]);
	this.musica.addKeyframe(0, 	   [0, 42, 89, 21]);
	this.salir.addKeyframe(0, 	   [0, 63, 73, 21]);
	this.sprite1.addKeyframe(0,    [0, 84,  13, 19]);
	this.sprite2.addKeyframe(0,    [13, 84, 13, 19]);
	this.sprite3.addKeyframe(0,    [26, 84, 13, 19]); 	
	this.sprite4.addKeyframe(0,    [39, 84, 15, 19]); 	
	this.sprite5.addKeyframe(0,    [54, 84, 13, 19]); 	
	this.low.addKeyframe(0, 	   [89, 42, 44, 21]);
	this.med.addKeyframe(0,        [89, 63, 43, 21]);
	this.hi.addKeyframe(0,         [89, 84, 28, 21]);
	this.cool.addKeyframe(0,       [0, 103, 58, 21]);
	this.chill.addKeyframe(0,      [0, 124, 73, 21]);
	this.off.addKeyframe(0,        [0, 145, 45, 21]);

	this.virusLevel.addKeyframe(0, [0, 166+0, 164, 21]);
	this.velocidad.addKeyframe(0,  [0, 166+21, 133, 21]);
	this.musica.addKeyframe(0, 	   [0, 166+42, 89, 21]);
	this.salir.addKeyframe(0, 	   [0, 166+63, 73, 21]);
	this.sprite1.addKeyframe(0,    [0, 166+84,  13, 19]);
	this.sprite2.addKeyframe(0,    [13,166+ 84, 13, 19]);
	this.sprite3.addKeyframe(0,    [26,166+ 84, 13, 19]); 	
	this.sprite4.addKeyframe(0,    [39,166+ 84, 15, 19]); 	
	this.sprite5.addKeyframe(0,    [54,166+ 84, 13, 19]); 	
	this.low.addKeyframe(0, 	   [89,166+ 42, 44, 21]);
	this.med.addKeyframe(0,        [89,166+ 63, 43, 21]);
	this.hi.addKeyframe(0,         [89,166+ 84, 28, 21]);
	this.cool.addKeyframe(0,       [0, 166+103, 58, 21]);
	this.chill.addKeyframe(0,      [0, 166+124, 73, 21]);
	this.off.addKeyframe(0,        [0, 166+145, 45, 21]);


	this.virusLevel.setAnimation(0);
	this.velocidad.setAnimation(0);  
	this.musica.setAnimation(0);     
	this.salir.setAnimation(0); 		
	this.sprite1.setAnimation(0); 	
	this.sprite2.setAnimation(0); 	
	this.sprite3.setAnimation(0); 	
	this.sprite4.setAnimation(0); 	
	this.sprite5.setAnimation(0); 	
	this.low.setAnimation(0); 		
	this.med.setAnimation(0); 		
	this.hi.setAnimation(0); 		
	this.cool.setAnimation(0); 		
	this.chill.setAnimation(0); 		
	this.off.setAnimation(0); 

	// this.textoSalir.addAnimation();
	// this.textoSalir.addKeyframe(0, [0, 0, 73, 21]);
	// this.textoSalir.addKeyframe(0, [0, 21, 73, 21]);
	// this.textoSalir.setAnimation(0);

	// Store current time
	this.currentTime = 0
}


SceneSelection.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Game logic
	if (keyboard[13]){
		keyboard[13] = false;
		whichScene = 4;
	}	

	// Update sprites
	this.virusLevel.update(deltaTime);
	this.velocidad.update(deltaTime);
	this.musica.update(deltaTime);
	this.salir.update(deltaTime);
	this.sprite1.update(deltaTime);
	this.sprite2.update(deltaTime);
	this.sprite3.update(deltaTime);
	this.sprite4.update(deltaTime);
	this.sprite5.update(deltaTime);
	this.low.update(deltaTime);
	this.med.update(deltaTime);
	this.hi.update(deltaTime);
	this.cool.update(deltaTime);
	this.chill.update(deltaTime);
	this.off.update(deltaTime);
}

SceneSelection.prototype.draw = function () // meter argumento
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	this.imageCreditos.draw();

	// Draw sprite salir (FALTA LOGICA)
	this.virusLevel.draw();
	this.velocidad.draw();
	this.musica.draw();
	this.salir.draw();
	this.sprite1.draw();
	this.sprite2.draw();
	this.sprite3.draw();
	this.sprite4.draw();
	this.sprite5.draw();
	this.low.draw();
	this.med.draw();
	this.hi.draw();
	this.cool.draw();
	this.chill.draw();
	this.off.draw();
}



