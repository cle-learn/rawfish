function Deck() {
    var top = 0;
    var cards = [];
}

Deck.prototype.loadCards = function() {

}

Deck.prototype.shuffle = function() {
    var cards = this.cards;
    var numCards = cards.length;

    // While there remain elements to shuffle…
    while (numCards) {
        // Pick a remaining element…
        var i = math.floor(math.random() * numCards--);

        // And swap it with the current element.
        var card = cards[numCards];
        cards[numCards] = cards[i];
        cards[i] = card;
    }
}

Deck.prototype.deal = function(players) {
    var cards = this.cards;
    var numPlayers = players.length;
    // 10 for 2, 9 for 3, 8 for 4, 7 for 5
    var cardsPerPlayer = 12 - numPlayers;
    var cardsToDeal = numPlayers * cardsPerPlayer;
    for (var i = 0; i < cardsToDeal; i++) {
        players[i % numPlayers].addCard(cards[this.top++])
    }
}
