const Cart = require("../models/Cart");
const Product = require("../models/Product");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(STATUS_CODE.BAD_REQUEST).send("Missing product name.");
  }

  try {
    const product = await Product.findByName(name);

    if (!product) {
      return res.status(STATUS_CODE.NOT_FOUND).send("Product not found.");
    }

    await Cart.add(product);

    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Error adding to cart.");
  }
};

exports.getProductsCount = async () => {
  return await Cart.getProductsQuantity();
};
