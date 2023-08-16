const router = require('express').Router();
var mongoose = require('mongoose');
const multer = require('multer');

// model
var Item = mongoose.model('Item');
const {
    ObjectId
} = require('mongodb');

//prerequisite for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // accept a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessing' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        cb(null, true);
    } else {
        // reject a file
        cb(null, false);
    }
};

const upload = multer({

    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //5 mb
    },
    fileFilter: fileFilter
});

//file upload
router.post("/upload", upload.single('item'), (req, res, next) => {
    console.log(req.file);
    res.send('file uploaded');
});

//add items
router.put('/add-item', function (request, response, next) {
    Item.updateOne({
        userId: request.body.userId
    }, {
        $push: {
            itemArray: {
                itemName: request.body.itemName,
                itemLocation: request.body.itemLocation
            }
        }
    }, function (err, res) { //res short for response
        if (err) {
            const error = new Error('Could not add the item');
            next(error);
            //response.status(500).send({error: "Could not update the menu"});
        } else {
            response.send(res);
        }
    });
});

//get items array from userId
router.get('/get-item/:userId', function (request, response, next) {
    Item.find({
        userId: request.params.userId
    }, {
        _id: 0,
        itemArray: 1
    }).exec(function (err, res) {
        if (err) {
            const error = new Error('No Item list found');
            next(error);
            //response.status(500).send({error: "No Menu For this Shop"});
        } else {
            response.send(res);
        }
    });
});

//delete item from itemArray
router.put('/delete-item', function (request, response, next) {
    Item.updateOne({
        userId: request.body.userId
    }, {
        $pull: {
            "itemArray": {
                "_id": {
                    $in: ObjectId(request.body.itemId)
                }
            }
        }
    }, function (err, res) {
        if (err) {
            const error = new Error('Could not delete the item');
            next(error);
            //response.status(500).send({error: "Could not find the item"});
        } else {
            response.send(res);
        }
    })
});

//update an item in itemArray
router.put('/update-item', function (request, response, next) {
    Item.updateOne({
        userId: request.body.userId,
        "itemArray._id": request.body.itemId
    }, {
        $set: {
            "itemArray.$.itemName": request.body.itemName,
            "itemArray.$.itemLocation": request.body.itemLocation
        }
    }, function (err, res) {
        if (err) {
            const error = new Error('Could not update the Item');
            next(error);
            //response.status(500).send({error: "Could not update the menu Item"});
        } else {
            response.send(res);
        }
    });
});

module.exports = router;