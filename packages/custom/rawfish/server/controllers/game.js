function Game() {
    this.deck = new Deck();
    this.players = [];

    function initGame() {
        this.deck.loadCards();
        this.shuffle();
    }

    initGame();
}

Game.prototype.addPlayer = function(name) {
    var player = new Player(name);
    this.players.push(player);
};

Game.prototype.getPlayers = function() {
    return this.players;
};

Game.prototype.startGame = function() {
    this.deck.deal(this.getPlayers());
};
