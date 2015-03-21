var uuid = require('uuid');

function Player(name) {
    this.id = uuid.v4();
    this.name = name;
    this.points = 0;
    this.hand = [];
    this.playedCards = [];
}

Player.prototype.getId = function() {
    return this.id;
}

Player.prototype.getName = function() {
    return this.name;
}

Player.prototype.getHand = function() {
    return this.hand;
}

Player.prototype.addCard = function(card) {
    this.hand.push(card);
}

Player.prototype.playCard = function(card) {
    var hand = this.hand;
    var cardIndex = hand.indexOf(card);
    this.hand.splice(cardIndex, 1);
    this.playedCards.push(card);
}

Player.prototype.getPlayedCards = function() {
    return this.playedCards;
}

Player.prototype.addPoints = function(points) {
    this.points += points;
}

Player.prototype.getPoints = function() {
    return this.points;
}
