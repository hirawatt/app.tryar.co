const router = require('express').Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// model
var Item = mongoose.model('Item');
var User = mongoose.model('User');

//prerequisite for file upload
const storage = multer.diskStorage({
    // Use the unique id as a parameter in the destination function
    destination: async function (req, file, cb) {
        // Create a subfolder path using the userid
        const subfolder = path.join('uploads', req.body.userId);

        try {
            // Check if the subfolder exists, if not create it
            await fs.promises.access(subfolder);
        } catch (error) {
            console.log('new directory created');
            await fs.promises.mkdir(subfolder);
        }
        cb(null, subfolder);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //5 mb
    }
});

//file upload
router.post("/upload", upload.fields([{
    name: 'imgFile',
    maxCount: 1
}, {
    name: 'modelFile',
    maxCount: 1
}]), (request, response, next) => {
    const item = {
        itemName: request.body.fileName,
        imgLocation: request.files.imgFile[0].path,
        modelLocation: request.files.modelFile[0].path,
    };
    Item.updateOne({
        userId: request.body.userId
    }, {
        $push: {
            itemArray: item
        }
    }).then(itemUpdateResult => {
        // Send a success status code and a JSON object with the item details
        response.status(200).json({
            message: 'File uploaded successfully'
        });
    }).catch(err => {
        // Send an error status code and a JSON object with the error message
        response.status(500).json({
            message: 'File upload unsuccessful'
            //error: err.message
        })
    })
});


//get items array from userId
router.get('/get-item/:userId', async function (request, response, next) {
    try {
        const res = await Item.find({
            userId: request.params.userId
        }, {
            _id: 0,
            itemArray: 1
        });
        response.status(200).json(res[0].itemArray);
    } catch (err) {
        response.status(500).json({
            message: 'No Item list found'
        })
    }
});


//delete item from itemArray
router.put('/delete-item', async function (request, response, next) {
    try {
        await Item.updateOne({
            userId: request.body.userId
        }, {
            $pull: {
                "itemArray": {
                    "_id": {
                        $in: request.body.itemId
                    }
                }
            }
        });

        //paths of the files to be deleted
        const filesToBeDeleted = [request.body.imgLocation, request.body.modelLocation];

        //Promise.all() to delete the files asynchronously
        await Promise.all(
            filesToBeDeleted.map((filePath) => {
                return new Promise((resolve, reject) => {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(`${filePath} deleted successfully`);
                        }
                    });
                });
            })
        );

        response.status(200).json({
            message: 'Item deleted successfully'
        });
    } catch (err) {
        response.status(500).json({
            message: 'Could not delete the item'
        })
    }
});


//delete the user
router.put('/delete-user', async function (request, response, next) {
    try {
        // method to create an absolute path for the folder which needs to be deleted
        const folderToBeDeleted = path.join('uploads', request.body.userId);

        // Use the fs.rmdir() method to delete the folder
        await fs.promises.rmdir(folderToBeDeleted, {
            recursive: true //recursive true so that all the files inside folders also get deleted
        });

        //removing database entry
        await User.deleteOne({
            _id: request.body.userId
        });
        await Item.deleteOne({
            userId: request.body.userId
        });

        request.session = null; //deleting the cookie

        response.status(200).json({
            message: 'Account deleted successfully'
        });
    } catch (err) {
        response.status(500).json({
            message: 'Could not delete the user'
        })
    }
});

module.exports = router;