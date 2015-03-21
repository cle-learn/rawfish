var uuid = require('uuid');

function Card(name, value) {
    var id = uuid.v4();
    var name = name;
    var value = value != undefined ? value : 0;
}
