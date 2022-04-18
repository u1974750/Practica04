class GameScene extends Phaser.Scene {
    constructor (){ //function (ja no fa falta especificar-ho)
        super('GameScene');  //crida el constructor de la classe la qual extén
		this.cards = null; //back de les cartes
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
    }

    preload (){	 //quins assets s'usen al joc
		//classe de l'escena.load.tipusLoad(nomDelRecurs, ruta) -> carrega textures
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}
	
    create (){	 //posa els assets a l'escena
		let arraycards = ['co', 'sb', 'co', 'sb'];
		this.cameras.main.setBackgroundColor(0xBFFCFF); //estableix color de fons
		
		this.add.image(250, 300, arraycards[0]);
		this.add.image(350, 300, arraycards[1]);
		this.add.image(450, 300, arraycards[2]);
		this.add.image(550, 300, arraycards[3]);
		//afageix imatge a l'escena(x,y,elemnent)  (mante mida original de l'arxiu)
		
		this.cards = this.physics.add.staticGroup(); 
			//physics -> objecte de físiques que detecta clics
			//staticGroup -> grup d'obj que tindran un comportament similar. Estatic perque no es mouen.
		
		this.cards.create(250, 300, 'back');
		this.cards.create(350, 300, 'back');
		this.cards.create(450, 300, 'back');
		this.cards.create(550, 300, 'back');
			//create -> crea imatge amb collider
			//this.nomNoExistent -> crea l'atribut

		let i = 0;
		this.cards.children.iterate((card)=>{ 								//passa un function arrow (PER USAR THIS!!!)
				//(card) es com un foreach -> cada element de la iteració es diu card
			card.card_id = arraycards[i];
				//creem un atribut id que igualem al nom de la carta
			i++;
			card.setInteractive(); 											//detecta clics del ratolí
			card.on('pointerup', () => {
				card.disableBody(true,true); 								//(render,interacció) desactivem: no es veu ni es pot interactuar
				if (this.firstClick){ 										//si ja s'ha clicat alguna carta
					if (this.firstClick.card_id !== card.card_id){ 			//comparem 1r clic amb 2n clic si codis son diferents
						this.score -= 20; //restem puntuació
						this.firstClick.enableBody(false, 0, 0, true, true); //torna a girar la primera carta
						card.enableBody(false, 0, 0, true, true); 			//torna a girar la segona carta
						if (this.score <= 0){ 								//si arribem a 0 punts
							alert("Game Over"); 							//FI DE PARTIDA
							loadpage("../"); 								//torna al menú
						}
					}
					else{
						this.correct++;
						if (this.correct >= 2){
							alert("You Win with " + this.score + " points.");
							loadpage("../");
						}
					}
					this.firstClick = null; //priemr clic es nul
				}
				else{
					this.firstClick = card; //si no havie mclicat cap abans, la priemra és la clicada ara
				}
			}, card);
		});
	}
	
	update (){	} //bucle infinit de l'escena
}

