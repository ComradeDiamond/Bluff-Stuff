/* Justin Notation (Hmm maybe give it a fancy name: Justin Object Location Systsem)

Look after a object declaration. 

If it ends in JS, chances are, it's an important javascript object but doesn't reference anything in the frontend
If it ends in CSS, the thing belongs to CSS
If it ends in HTML, it is a direct HTML name or ID 
If it ends in nothing but references an object, it's a reference to the object with the HTML tag attributes (Or a "JS ID Object")

ie. AnonomyousKittenHTML is probably the ID for the div
AnonomyousKittenCSS is probably the class 
AnonomyousKitten is probably the reference to AnomonyousKittenHTML (think of it as a replacement for stuff like divOut)
*/

const cardsName = { //JSON to keep track of the cards
	ace : 1,
	two : 2,
	three : 3,
	four : 4,
	five : 5,
	six : 6,
	seven: 7,
	eight : 8,
	nine : 9,
	ten : 10,
	jack : 11,
	queen : 12,
	king : 13
}
const cardItem = { //Keep track of the card items
	clover : 0,
	diamond : 1,
	hearts : 2,
	spades : 3
}
const cardsValues = [ //Basically flipping cardsName
	null,
	'an ace',
	'a two',
	'a three',
	'a four',
	'a five',
	'a six',
	'a seven',
	'an eight',
	'a nine',
	'a ten',
	'a Jack',
	'a Queen',
	'a King'
]
const valueLoop = [
	null,
	"ace",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"ten",
	"Jack",
	"Queen",
	"King"
]
function xOfY(x, y) { // Looks for ___ of ___. ie. ace of spades
	return `${cardsName.x}-${cardItem.y}`
}
function Deck() { //The card deck
	this.remaining = 0;
	this.deck = [];
}
Deck.prototype.generateDeck = function() //Just generates a deck
{
	for (var i=1; i<14; i++)
	{
		for (var c=0; c<4; c++)
		{
			this.deck.push(new Card(i, c));
		}
	}
}
Deck.prototype.shuffleDeck = function() //Shuffles Deck
{
	for (var i = this.deck.length-1; i > 0; i--)
	{
		let tempNumber = Math.floor(Math.random() * i); //Copied from level 2
		let currentNumber = this.deck[i];
		this.deck[i] = this.deck[tempNumber];
		this.deck[tempNumber] = currentNumber;
	}
}
function Card(x, y) 
{
	this.value = x;
	this.item = y;
	this.officialLanguage = `${x}-${y}`;
	this.image = "Images/" + this.officialLanguage + ".png";
	this.up = false;
}
Card.prototype.createCard = function(cardHolder)
{
	let mainObject = this; //Using this inside event listener messes up scoping so we're doing it here

	let tempCard = document.createElement("img");
	tempCard.src = this.image;
	tempCard.style.cursor = "pointer";
	tempCard.style.position = "relative";

	tempCard.addEventListener("click", function() {
		if (mainObject.up)
		{
			tempCard.style.bottom = "0px";
		}
		else
		{
			tempCard.style.bottom = "8px";
		}
		mainObject.up = !mainObject.up;
	})

	cardHolder.appendChild(tempCard);

	return tempCard;
}
function Player()
{
	this.hand = [];
	this.isAi = true;
	this.aiDisplay = null;
	this.animationClassName = null;
}
Player.prototype.addCard = function(card)
{
	this.hand.push(card);
}
Player.prototype.bind = function(jsIDObject) //JS ID Object --> See Justin Notation
//Binds the AI player to a frontend object
{
	if (this.isAi)
	{
		this.aiDisplay = jsIDObject;
	}
}
Player.prototype.matchArray = function() //AI finds the number of cards that have matching ranks
{
	let tempIndexArray = [];

	for (var i=0; i<this.hand.length; i++)
	{
		if (this.hand[i].value == currentValue)
		{
			tempIndexArray.push(i);
		}
	}

	return tempIndexArray;
}
Player.prototype.playCard = function() //Gets rid of the card from your hand
{	
	//Resets the last played cards
	lastPlayedCards = [];

	//Seperates player card playing from AI card playing
	if (this.isAi)
	{
		let indexArray = this.matchArray();
		let doesRandomCardRepeat = true; //Check whether the card index has already been in list

		//If there is >2 matches, play all the matches

		//If there is one card, it will play a second card with a 10% chance
		if (indexArray.length == 1)
		{
			if (Math.round(Math.random() * 10) == 0) //10% chance it will play 2 cards
			{
				while (doesRandomCardRepeat) //Picks a random card in the AI hand that does not repeat
				{
					let randomNumber = Math.round(Math.random() * this.hand.length);

					if (indexArray.indexOf(randomNumber) == -1)
					{
						indexArray.push(randomNumber);
						doesRandomCardRepeat = false;
					}
				}
			}
		}
		else if (indexArray.length == 0)
		{
			indexArray.push(Math.round(Math.random() * this.hand.length));
		}

		indexArray.sort(function(a, b){return b - a});

		for (let i in indexArray) //Plays/Deletes the card in the hand that corresponds to the index/number inside the indexArray
		{
			let tempPlayedCard = this.hand.splice(indexArray[i], 1)[0];
			centerPile.push(tempPlayedCard);
			lastPlayedCards.push(tempPlayedCard);
		}

		return indexArray.length;
	}
	else
	{
		//Index array logs all the indexes to remove later
		let indexArray = [];

		for (let i in this.hand)
		{
			if (this.hand[i].up) //Up = play
			{
				let cardPosition = this.hand.indexOf(this.hand[i]);
				indexArray.push(cardPosition);
			}
		}

		//Goes backwards when clearing so former cards in this.hand are unaffected
		for (let i=(indexArray.length-1); i>=0; i--) 
		{
			let tempPlayedCard = this.hand.splice(indexArray[i], 1);
			centerPile.push(tempPlayedCard);
			lastPlayedCards.push(tempPlayedCard);
		}
	}
}
Player.prototype.updateHand = async function(stache) //Makes sure all the card appears in the player's hand eventually
{
	for (var i in this.hand)
	{
		this.hand[i].createCard(stache);
	}
}
Player.prototype.checkNumSelected = function() //Returns how much cards the player has selected
{
	let numSelected = 0;

	for (var i in this.hand)
	{
		if (this.hand[i].up)
		{
			numSelected++;
		}
	}

	return numSelected;
}
Player.prototype.selectionArray = function() //Returns an array with the indexes of the cards that have been up
//Loop backwards when you use this
{
	let indexArray = [];

	for (var i in this.hand)
	{
		if (this.hand[i].up)
		{
			indexArray.push(i);
		}
	}

	return indexArray;
}