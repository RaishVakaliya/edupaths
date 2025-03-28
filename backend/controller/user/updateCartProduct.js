const addToCartModel = require("../../models/cartProduct");

const updateCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const cartProductId = req?.body?._id;

    const qty = req.body.quantity;

    const updateProduct = await addToCartModel.updateOne(
      { _id: cartProductId },
      {
        ...(qty && { quantity: qty }),
      }
    );

    res.json({
      data: updateProduct,
      message: "review updated",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = updateCartProduct;
