const {
	checkDirectoryExistOrNot,
	uploadFile,
	deleteFile,
	deleteFolder,
	//getObjectSignedUrl
} = require('./s3.js');
const router = require('express').Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// model
var Item = mongoose.model('Item');
var User = mongoose.model('User');

//prerequisite for file upload
// const storage = multer.diskStorage({
// 	// Use the unique id as a parameter in the destination function
// 	destination: async function (req, file, cb) {
// 		// Create a subfolder path using the userid
// 		await checkDirectoryExistOrNot(req.body.userId);
// 		cb(null, './uploads/');
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, Date.now() + file.originalname);
// 	}
// });

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
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
}]), async (request, response, next) => {

	await checkDirectoryExistOrNot(request.body.userId);

	for (let field of ['imgFile', 'modelFile']) {
		let file = request.files[field][0];
		let fileBody = fs.createReadStream(file.path)
		let fileName = request.body.userId + "/" + file.filename
		await uploadFile(fileBody, fileName, file.mimetype)

		fs.unlink(file.path, (err) => {
			if (err) console.log(err);
			console.log('File deleted from disk!');
		});
	}

	const item = {
		itemName: request.body.fileName,
		imgLocation: request.body.userId + "/" + request.files.imgFile[0].filename,
		modelLocation: request.body.userId + "/" + request.files.modelFile[0].filename
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

		//delete file from bucket
		filesToBeDeleted.forEach(async (filePath) => {
			await deleteFile(filePath)
		})

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
		//remove directory from bucket
		await deleteFolder(request.body.userId + '/');

		// removing database entry
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