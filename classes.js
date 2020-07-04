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
	this.image = this.officialLanguage + ".png";
}
function Card.prototype.createCard()