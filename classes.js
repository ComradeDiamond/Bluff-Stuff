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
}
Player.prototype.addCard = function(card)
{
	this.hand.push(card);
}
Player.prototype.playCard = function() //Gets rid of the card from your hand
{
	/*for (var i in cardArray)
	{
		let cardPosition = this.hand.indexOf(cardArray[i]);
		cardArray.splice(cardPosition, 1);
	}
	*/
	let indexArray = [];
	//Push and ppop
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
		this.hand.splice(indexArray[i], 1);
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