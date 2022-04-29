function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
}

function phaser_game(){
	loadpage("./phasergame.html");
}

function phaser_menu(){
	loadpage("./html/phasermenu.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
}

function options(){
	loadpage("./html/options.html");
}

function load(){
	loadpage("./html/load.html");
}

function back(){
	loadpage("../index.html");
}

function points(){
	alert("points");
}

function phaser_points(){
	loadpage("./options.html");
}

function phaser_load(){
	loadpage("./load.html");
}

function game_modes(){
	loadpage("./gamemode.html");
}

function phaser_infinity_game(){
	loadpage("./phaserInfinity.html");
}

