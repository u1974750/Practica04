class GameScene extends Phaser.Scene {
    constructor (){ //function (ja no fa falta especificar-ho)
        super('GameScene');  //crida el constructor de la classe la qual extén
		this.cards = null; //back de les cartes
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.dif = 20;

		var json = localStorage.getItem("config") || '{"cards":2,"difficulty":"hard"}';
		this.optionsInfo = JSON.parse(json);
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
		console.log(this.optionsInfo.cards);
	}
	
    create (){	 //posa els assets a l'escena
		//Phasr.Utils.Array.Shuffle(array)
		let arraycards = ['co','co','sb','sb'];
		if(this.optionsInfo.cards == 3){
			arraycards = ['co','co','sb','sb', 'tb','tb'];
			this.dif = 25;
		}
		else if(this.optionsInfo.cards == 4){
			arraycards = ['co','co','sb','sb', 'tb','tb','so','so'];
			this.dif = 30;
		}
		console.log(arraycards);
		Phaser.Utils.Array.Shuffle(arraycards);
		console.log(arraycards);
		//TODO: mirar que el array sigui de tantes cartes com seleccionades a opcions*2


		this.cameras.main.setBackgroundColor(0xBFFCFF); //estableix color de fons
		
		let posX = 250;
		for(var n = 0; n < this.optionsInfo.cards*2; n++){
			this.add.image(posX, 300, arraycards[n]);
			//afageix imatge a l'escena(x,y,elemnent)  (mante mida original de l'arxiu)
			posX+= 100;
		}
		
		this.cards = this.physics.add.staticGroup(); 
			//physics -> objecte de físiques que detecta clics
			//staticGroup -> grup d'obj que tindran un comportament similar. Estatic perque no es mouen.
		/*	
		posX = 250;
		for(var n = 0; n < this.optionsInfo.cards*2; n++){
			this.cards.create(posX, 300, 'back');
			posX+= 100;
		}
		*/
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
						this.score -= this.dif; //restem puntuació
						this.firstClick.enableBody(false, 0, 0, true, true); //torna a girar la primera carta
						card.enableBody(false, 0, 0, true, true); 			//torna a girar la segona carta
						if (this.score <= 0){ 								//si arribem a 0 punts
							alert("Game Over"); 							//FI DE PARTIDA
							loadpage("../"); 								//torna al menú
						}
					}
					else{
						this.correct++;
						if (this.correct >= this.optionsInfo.cards){
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

