var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
//CONECTING DB// APP CONFI
mongoose.connect(
  "mongodb+srv://khanh93551:Matkhausai1@cluster0.fai5sph.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

//SCHEMA
let Custommer4sSchema = mongoose.Schema({
  idDistrict: {
    type: Number,
    trim: true,
  },
  idVillage: {
    type: Number,
    trim: true,
  },
  address: {
    type: String,
  },
  bankName: {
    type: String,
  },
  branchName: {
    type: String,
  },
});

//MODEL
let custommer4s = mongoose.model("Custommer4s", Custommer4sSchema);

/* GET home page. */
router.get("/", function (req, res, next) {
  custommer4s.find({}, (error, data) => {
    console.log("danh sách khách hàng ", data);
    res.render("index", { custommer4s: data });
  });
});
router.get("/form-add", function (req, res, next) {
  res.render("form-add", {});
});
router.post("/add", function (req, res, next) {
  custommer4s.create(req.body);
  res.redirect("/");
});

router.get("/form-update/:id", function (req, res, next) {
  custommer4s.findById(req.params.id, (error, data) => {
    res.render("form-update", { custommer4: data });
  });
});
router.post("/update", function (req, res, next) {
  custommer4s.findByIdAndUpdate(req.body.id, req.body, (error, data) => {
    res.redirect("/");
  });
});
// form delete
router.get("/form-delete/:id", function (req, res, next) {
  custommer4s.findByIdAndDelete(req.params.id, (error, data) => {
    res.redirect("/");
  });
});

module.exports = router;
