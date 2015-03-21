var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Game() {
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

Game.prototype.handleMove = function() {
    this.movesHandled++;
    // Add processing of moves here
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
};
