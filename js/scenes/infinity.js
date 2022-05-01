var optionsInfo = {
    cards: 2,
    dificulty: "hard"
};
var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
var jsonScore = localStorage.getItem("points");
var jsonRound = localStorage.getItem("round");
var jsonArray2 = localStorage.getItem("rankinginf");
var rnk2 = JSON.parse(jsonArray2);
var jsonName = localStorage.getItem("name");

class GameScene extends Phaser.Scene {
    constructor () {
        //function (ja no fa falta especificar-ho)
        super('GameScene'); //crida el constructor de la classe la qual extén
        this.cards = null; //back de les cartes
        this.firstClick = null;
        this.score = JSON.parse(jsonScore);
        if (this.score == null) this.score = 100;
        this.round = JSON.parse(jsonRound);
        if (this.round == null) this.round = 1;
        this.correct = 0;
        this.difPoints = 20;
        this.difSeconds = 0;
        this.optionsInfo = JSON.parse(json);
        this.name = JSON.parse(jsonName);
    }



    preload () {
        //quins assets s'usen al joc
        //classe de l'escena.load.tipusLoad(nomDelRecurs, ruta) -> carrega textures
        this.load.image('back', '../resources/back.png');
        this.load.image('cb', '../resources/cb.png');
        this.load.image('co', '../resources/co.png');
        this.load.image('sb', '../resources/sb.png');
        this.load.image('so', '../resources/so.png');
        this.load.image('tb', '../resources/tb.png');
        this.load.image('to', '../resources/to.png');
        if(this.name == " "){
            this.name = prompt("Enter your name: ");
        }
    }

    create () {
        //posa els assets a l'escena
        if(rnk2 == null) rnk2 = [];

        //var canPlay = false;
        let arraycards = ['co','co', 'sb', 'sb'];
        if (this.optionsInfo.cards == 3) {
            arraycards = ['co', 'co', 'sb', 'sb', 'tb', 'tb'];
            this.difPoints = 25;
        } else if (this.optionsInfo.cards == 4) {
            arraycards = ['co', 'co', 'sb',  'sb', 'tb', 'tb', 'so', 'so'];
            this.difPoints = 30;
        }
        Phaser.Utils.Array.Shuffle(arraycards);

        var jsonSeconds = localStorage.getItem("seconds");
        
        if (this.optionsInfo.dificulty == 'hard') this.difSeconds = 2000;
        else if (this.optionsInfo.dificulty == 'normal') this.difSeconds = 2500;
        else if (this.optionsInfo.dificulty == 'easy') this.difSeconds = 3000;
        this.difSeconds -= JSON.parse(jsonSeconds);


        this.cameras.main.setBackgroundColor(0xBFFCFF); //estableix color de fons

        let posX = 250;
        for (var n = 0; n < this.optionsInfo.cards*2; n++) {
            this.add.image(posX, 300, arraycards[n]);
            //afageix imatge a l'escena(x,y,elemnent)  (mante mida original de l'arxiu)
            posX += 100;
        }

        this.cards = this.physics.add.staticGroup();
        //physics -> objecte de físiques que detecta clics
        //staticGroup -> grup d'obj que tindran un comportament similar. Estatic perque no es mouen.

        this.time.delayedCall(this.difSeconds, ()=> {
            posX = 250;
            for (var n = 0; n < this.optionsInfo.cards*2; n++) {
                this.cards.create(posX, 300, 'back');
                //create -> crea imatge amb collider
                //this.nomNoExistent -> crea l'atribut
                posX += 100;
            }
            
            console.log(this.score);
            console.log(this.round);
            console.log(this.difSeconds);
            let i = 0;
            this.cards.children.iterate((card)=> {
                //(card) es com un foreach -> cada element de la iteració es diu card
                card.card_id = arraycards[i];
                //creem un atribut id que igualem al nom de la carta
                i++;
                card.setInteractive(); //detecta clics del ratolí
                card.on('pointerup', () => {
                    card.disableBody(true, true); //(render,interacció) desactivem: no es veu ni es pot interactuar
                    this.time.delayedCall(500, ()=> {
                        if (this.firstClick) {
                            //si ja s'ha clicat alguna carta
                            if (this.firstClick.card_id !== card.card_id) {
                                //comparem 1r clic amb 2n clic si codis son diferents
                                this.score -= this.difPoints; //restem puntuació
                                this.firstClick.enableBody(false, 0, 0, true, true); //torna a girar la primera carta
                                card.enableBody(false, 0, 0, true, true); //torna a girar la segona carta
                                console.log(this.score);
                                if (this.score <= 0) {
                                    //si arribem a 0 punts
                                    alert("Game Over at Round:  " + this.round); //FI DE PARTIDA
                                    loadpage("../"); //torna al menú
                                    localStorage.setItem("points", JSON.stringify(100));
                                    localStorage.setItem("round", JSON.stringify(1));
                                    localStorage.setItem("seconds", JSON.stringify(5));
                                    rnk2.push(["Name: "+ this.name, " Rounds: " + this.round]);
                                    localStorage.setItem("rankinginf", JSON.stringify(rnk2));
                                    localStorage.setItem("name", JSON.stringify(" "));
                                }
                            } else {
                                this.correct++;
                                if (this.correct >= this.optionsInfo.cards) {
                                    localStorage.setItem("points", JSON.stringify(this.score));
                                    this.round += 1;
                                    localStorage.setItem("round", JSON.stringify(this.round));
                                    var secondsToAdd = 5 * this.round
                                    localStorage.setItem("seconds", JSON.stringify(secondsToAdd));
                                    localStorage.setItem("name", JSON.stringify(this.name));
                                    loadpage("./phaserInfinity.html")
                                }
                            }
                            this.firstClick = null; //priemr clic es nul
                        } else {
                            this.firstClick = card; //si no havie mclicat cap abans, la priemra és la clicada ara
                        }
                    });
                    
                }, card);
            });
        })


    }

    update () {} //bucle infinit de l'escena
}