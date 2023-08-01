const router = require('express').Router();
var mongoose = require('mongoose');

// model
var Item = mongoose.model('Item');
const {
    ObjectId
} = require('mongodb');

//add item for current user
router.put('/item', function (request, response, next) {
    Item.updateOne({
        ownerEmail: request.body.userEmail
    }, {
        $push: {
            item: {
                itemName: request.body.itemName,
                itemLocation: request.body.itemLocation
            }
        }
    }, function (err, item) {
        if (err) {
            const error = new Error('Could not update the item list');
            next(error);
            //response.status(500).send({error: "Could not update the item list"});
        } else {
            response.send(item);
        }
    });
});

module.exports = router;