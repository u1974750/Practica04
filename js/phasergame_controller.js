var config = {
    type: Phaser.AUTO,
    width: 1200, //ample de la pantalla
    height: 600, //alçada de la pantalla
    parent: 'game_area', //a quin objecte html possa el joc
	physics: { //quin motor de físiques usara
		default: 'arcade', 
		arcade: {
			gravity: {y: 0}, //sense gravetat
			debug: false //no volem que faci debug
		}
	},
    scene: [ GameScene ] //escenes (pantalles) del joc
};

var game = new Phaser.Game(config); //crea el joc phaser

