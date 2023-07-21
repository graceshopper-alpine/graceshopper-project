const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

router.use("/users", require("./users"));
router.use("/sessions", require("./sessions"));
router.use("/orders", require("./orders"));
router.use("/admin", require("./admin"));

// view all product
router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// view single product
router.get("/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
