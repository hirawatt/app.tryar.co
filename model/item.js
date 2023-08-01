var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var item = new Schema({
    ownerEmail: String,
    item: [{
        itemName: String,
        itemLocation: String,
    }]
});

mongoose.model('Item', item);