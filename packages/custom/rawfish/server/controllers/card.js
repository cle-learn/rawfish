var uuid = require('uuid');

function Card(name, value) {
    this.id = uuid.v4();
    this.name = name;
    this.value = value != undefined ? value : 0;
}
