
let isStarted = false;
let dragonNumberArray = [];
let randomNumber;
let dragonChoice;
let damage;
let dragonAlive = true;
let isHit = false;
let isShieldEquipped = false;

console.log("Enter start(); to start the game");

function start() {
	console.log('The game has started.');
	console.log('You are the Hero who is fighting with the Dragon');
	console.log('To win you need to attack and destroy the Dragon');
	console.log('Here are the commands you can enter:');
	console.log('1. attack(); to attack');
	console.log('2. stall(); to do nothing');
	console.log('3. defend(); to defend');
	isStarted = true;
}

function attack() {
	console.log("Guess the number from 0 to 100 to hit the Dragon");
	console.log("Enter enterNumber(your number);");
}

function stall() {
	console.log("Hero did nothing");
	checkDragonAlive();
}

function defend() {
	isShieldEquipped = true;
	Hero.equipShield();
	checkDragonAlive();
	isShieldEquipped = false;
	Hero.removeShield();
}

function enterNumber(guessNumber) {
	if (isStarted) {
		if (!isNaN(guessNumber)) {
			generateLocation();
			checkHit(guessNumber);
			checkDragonAlive();
		}
		isHit = false;
	} else {
		console.log("Enter start(); to start the game");
	}
}

// Check if input number matches numbers in the location of Dragon
function checkHit(guessNumber) {
	for (let i = 0; i < dragonNumberArray.length; i++) {
		if (guessNumber == dragonNumberArray[i]) {
			isHit = true;
			damage = Hero.str + Hero.weapon - Dragon.defense;
			modifyHealth(Dragon, damage);
		}
	}
	showAttackMessage();
	if (Dragon.hp <= 0) {
		dragonAlive = false;
		console.log('Congratulations! You killed the Dragon');
		console.log("End of the game.");
		console.log(Dragon.toString());
		console.log(Hero.toString());
		isStarted = false;
	} else if (isHit) {
		console.log("Damage of " + damage + " has ben made to the Dragon");
		console.log("Dragon hp: " + Dragon.hp);
	} else {
		console.log("Damage has not been made to Dragon");
	}
}


// Check if Dragon is alive
function checkDragonAlive() {
	if (dragonAlive) {
		dragonChoice = Math.round(Math.random());
		if (dragonChoice == 1) {
			dragonAttack();
		} else {
			console.log("Dragon chose not to attack");
		}
		console.log("-----------------------------------");
	}
}

// Shows the result of attack of Dragon; Hit or not
function showAttackMessage() {
	if (isHit) {
		console.log("You hit the dragon! Conratulations!");
	} else {
		console.log("Ow, no! You missed! You didn't hit the dragon!");
	}
}

// Generates an array of random numbers of where the Dragon could be
function generateLocation() {
	dragonNumberArray = [];
	for (let i = 0; i < 75; i++) {
		randomNumber = Math.floor(Math.random() * 100);
		if (!dragonNumberArray.includes(randomNumber)) {
			dragonNumberArray.push(randomNumber);
		} else {
			i--;
		}
	}
}

// modifies the Health Points(HP) of the Hero or Dragon
function modifyHealth(obj, dmg) {
	if (obj.hp != 0) {
		if (dmg > 0)
			obj.hp -= dmg;
	}
}

// Dragon's turn
function dragonAttack() {
	damage = Dragon.str + Dragon.weapon - Hero.defense;
	modifyHealth(Hero, damage);
	console.log("Dragon is attacking...");
	if (damage > 0) {
		console.log("A damage of " + damage + " has been made to Hero;");
	} else {
		console.log("Damage to hero has not been made");
	}
	console.log("Hero: " + Hero.hp + " HP");
	if (Hero.hp <= 0) {
		console.log("Dragon killed the Hero. Game over!");
		console.log(Dragon.toString());
		console.log(Hero.toString());
		isStarted = false;
	}
}



const Dragon = {
	hp: 2000,
	defense: 120,
	str: 150,
	weapon: 0,
	showInfo() {
		console.log("Dragon: " + this.hp + " HP");
	},
}

const Hero = {
	hp: 1000,
	defense: 100,
	str: 120,
	weapon: 250,
	shield: 150,
	showInfo() {
		console.log("Hero: " + this.hp + " HP");
	},
	equipShield() {
		if (isShieldEquipped) {
			this.defense += this.shield;
		} else {
			console.log('Shield is already equipped');
		}
	},
	removeShield() {
		if (!isShieldEquipped) {
			this.defense -= this.shield;
		} else {
			console.log("Shield is already removed");
		}
	}
}

Dragon.toString = function dragonToString() {
	return `Dragon hp: ${this.hp}
Dragon defense: ${this.defense}
Dragon str: ${this.str}
Dragon weapon: ${this.weapon}`;
}

Hero.toString = function heroToString() {
	return `Hero hp: ${this.hp}
Hero defense: ${this.defense}
Hero str: ${this.str}
Hero weapon: ${this.weapon}`;
}


