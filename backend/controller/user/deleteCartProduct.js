const addToCartModel = require("../../models/cartProduct");

const deleteCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const cartProductId = req?.body?._id;

    const deleteProduct = await addToCartModel.deleteOne({
      _id: cartProductId,
    });

    res.json({
      data: deleteProduct,
      message: "review Deleted",
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

module.exports = deleteCartProduct;
