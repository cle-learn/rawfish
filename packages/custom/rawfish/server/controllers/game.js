var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Game() {
    this.rounds = 0;
    this.movesHandled = 0;
    this.deck = new Deck();
    this.players = [];
    EventEmitter.call(this);
}

util.inherits(Game, EventEmitter);

Game.prototype.init = function() {
    this.deck.loadCards();
    this.deck.shuffle();
};

Game.prototype.addPlayer = function(name) {
    var player = new Player(name);
    this.players.push(player);
};

Game.prototype.getPlayers = function() {
    return this.players;
};

Game.prototype.startGame = function() {
    if (this.players.length >= 2) {
        this.deck.deal(this.getPlayers());
    }
    else {
        console.log("At least two players must be present to start a game.");
    }
};

Game.prototype.handleMove = function(player, card) {
    this.movesHandled++;
    player.playCard(card);
    if (this.movesHandled == this.players.length) {
        this.movesHandled = 0;
        this.tradeHands();
        this.emit('turn_processed');
    }
};

Game.prototype.tradeHands = function() {
    var players = this.players;
    var tempHand = players[0].hand;
    for (var i = 0; i < players.length - 1; i++) {
        tempHand = players[i + 1].hand;
        players[i + 1].hand = players[i];
    }
    players[0].hand = tempHand;

    // All players have the same number of cards in their hand, so just check the first one
    if (players[0].hand.length == 1) {
        this.endRound();
    }
};

Game.prototype.endRound = function() {
    var players = this.players;
    this.rounds++;
    for (var i = 0; i < players.length; i++) {
        this.handleMove(players[i], players[i].hand[0]);
        // players[i].determineScore();
    }
    this.emit('round_complete');

    // The game ends after 3 rounds. The player with the most points wins
    if (this.rounds == 3) {
        this.determineWinners();
    }
};

Game.prototype.determineWinners = function() {
    var players = this.players;
    var winners = [players[0]];
    for (var i = 1; i < players.length; i++) {
        if (players[i].getPoints() > winners[0].getPoints()) {
            // If there was a tie and now someone has more points, remove all but the first player
            // in the list and replace them
            if (winners.length > 1) {
                winners = winners.slice(0, 1);
            }
            winners[0] = players[i];
        }
        // If there is a tie, add the new player to the list
        else if (players[i].getPoints() == winners[0].getPoints()) {
            winners.push(players[i]);
        }
    }
    return winners;
};
