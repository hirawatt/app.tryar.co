var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var item = new Schema({
    userId: String, //using mongodb generated Id to ref items
    itemArray: [{
        itemName: String,
        itemLocation: String,
    }]
});

mongoose.model('Item', item);