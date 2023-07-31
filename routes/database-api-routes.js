const router = require('express').Router();
var mongoose = require('mongoose');

// model
var Menu = mongoose.model('Menu');
const {
    ObjectId
} = require('mongodb');

//const multer = require('multer');

//prerequisite for file upload
/*const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
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
});*/

//post/add new shop
router.put('/shop', function (request, response, next) {
    Shop.updateOne({
        ownerEmail: request.body.userEmail
    }, {
        $push: {
            shop: {
                shopName: request.body.shopName,
                shopAddress: {
                    value: request.body.shopAddress
                },
                noOfTables: request.body.noOfTables
            }
        }
    }, function (err, shop) {
        if (err) {
            const error = new Error('Could not complete the shop registration');
            next(error);
            //response.status(500).send({error: "Could not complete the shop registration"});
        } else {
            //db.users.find({awards: {$elemMatch: {award:'National Medal', year:1975}}})
            //var shopIdVar = 
            Shop.find({
                "shop.shopName": request.body.shopName
            }, {
                _id: 0,
                ownerEmail: 0,
                shop: {
                    $elemMatch: {
                        shopName: request.body.shopName
                    }
                }
            }).exec(function (err, shopId) {
                //response.send(shopId)
                console.log(shopId[0].shop[0]._id);

                new Menu({
                    shopId: shopId[0].shop[0]._id
                }).save().then((newMenu) => {
                    //console.log(shop._id);
                    console.log(newMenu);
                })
            })

            response.send(shop);
        }
    });
});

module.exports = router;