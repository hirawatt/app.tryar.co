const router = require('express').Router();
var mongoose = require('mongoose');
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
}]), async (req, res, next) => {
    try {
        const item = {
            itemName: req.body.fileName,
            imgLocation: req.files.imgFile[0].path,
            modelLocation: req.files.modelFile[0].path,
        };
        const itemUpdateResult = await Item.updateOne({
            userId: req.body.userId
        }, {
            $push: {
                itemArray: item
            }
        });
        res.send('file uploaded');
    } catch (err) {
        const error = new Error('Could not add the item');
        res.send(error);
    }
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
        response.send(res);
    } catch (err) {
        const error = new Error('No Item list found');
        next(error);
    }
});


//delete item from itemArray
router.put('/delete-item', async function (request, response, next) {
    try {
        const itemDeleteResult = await Item.updateOne({
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

        response.send(itemDeleteResult);
    } catch (err) {
        const error = new Error('Could not delete the item');
        next(error);
    }
});


//delete the user
router.put('/delete-user', async function (request, response, next) {
    try {
        const userDeleteResult = await User.deleteOne({
            _id: request.body.userId
        });
        const itemDeleteResult = await Item.deleteOne({
            userId: request.body.userId
        });

        // method to create an absolute path for the folder which needs to be deleted
        const folderToBeDeleted = path.join('uploads', request.body.userId);

        // Use the fs.rmdir() method to delete the folder
        await fs.promises.rmdir(folderToBeDeleted, {
            recursive: true
        });

        response.send({
            userDeleteResult,
            itemDeleteResult
        });
    } catch (err) {
        const error = new Error('Could not delete the user');
        next(error);
    }
});

module.exports = router;