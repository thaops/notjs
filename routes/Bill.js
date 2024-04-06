var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var app = express();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Bill = require("../models/Bill");
const ProductsInCart = require("../models/ProductsInCart");

router.get("/get", function (req, res) {
  Bill.find()
    .then((bill) => {
      res.json(bill);
    })
    .catch((err) => {
      res.status(500).json("that bai");
    });
});

router.post("/api/addBill", (req, res, next) => {
  const billData = req.body;
  const bill = new Bill(billData);

  bill
    .save()
    .then((savedBill) => {
      const ids = req.body.products;

      if (!Array.isArray(ids)) {
        return res.status(400).json({ msg: "Product IDs phải là một mảng" });
      }

      ProductsInCart.deleteMany({ _id: { $in: ids } })
        .then((data) => {
          if (data.deletedCount > 0) {
            res.json({
            "code":1,  msg: "Đã thêm đơn hàng thành công và cập nhật giỏ hàng",
            });
          } else {
            res.json({ msg: "Đã thêm đơn hàng thành công" });
          }
        })
        .catch((err) => {
          console.error("Lỗi khi xóa sản phẩm ra khỏi giỏ hàng:", err);
          return res
            .status(500)
            .json({ msg: "Xóa sản phẩm ra khỏi giỏ hàng thất bại" });
        });
    })
    .catch((error) => {
      res.status(500).json({ msg: "Lỗi khi thêm đơn hàng: " + error.message });
    });
});

router.get('/getBill/:user', function(req,res){
    const user = req.params.user;

    Bill.find({ user: user })
        .then(data =>{
            res.json(data);
        })
        .catch(err=>{
            res.status(400).json({ message: err.message });
        });
});
module.exports = router;
