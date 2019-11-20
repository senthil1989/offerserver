var express = require("express");
var multer = require("multer");
var mongoose = require("mongoose");
var router = express.Router();
var db = require("../models");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
      console.log(file.originalname)
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});
router.get("/", function(req, res) {
  db.Ofshop.find()
    .then(function(products) {
      console.log(products);
      res.json(products);
    })
    .catch(function(er) {
      res.send(er);
    });
});
router.post("/", upload.single("shop_image"), function(req, res) {
  console.log(req.file);
  const products = new db.Ofshop({
    _id: new mongoose.Types.ObjectId(),
    shop_name: req.body.shop_name,
    shop_image: req.file.path.replace("\\","/"),
    shop_offer: req.body.shop_offer,
    shop_number: req.body.shop_number,
    created_date: new Date()
  });

  db.Ofshop.create(products)
    .then(function(newproduct) {
      console.log(newproduct);
      res.json(newproduct);
    })
    .catch(function(er) {
      res.send(er);
    });
});

router.get("/:productId", function(req, res) {
  db.Ofshop.findById(req.params.productId)
    .then(function(foundproducts) {
      res.json(foundproducts);
    })
    .catch(function(er) {
      res.send(er);
    });
});
router.put("/:productId", function(req, res) {
  db.Ofshop.findOneAndUpdate({ _id: req.params.productId }, req.body)
    .then(function(updateproducts) {
      res.json(updateproducts);
    })
    .catch(function(er) {
      res.send(er);
    });
});
router.delete("/:productId", function(req, res) {
    db.Ofshop.remove({ _id: req.params.productId }, req.body)
      .then(function() {
        res.json({message:"item deleted"});
      })
      .catch(function(er) {
        res.send(er);
      });
  });

module.exports = router;

// api:AIzaSyCF287OCD94uQr8c41cY08-Zmrrd3-JkGI