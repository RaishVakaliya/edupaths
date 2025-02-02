const productModel = require("../../models/productModel");

const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("category");

    //array to store one product from each category
    const productByCategory = [];

    for (category of productCategory) {
      const product = await productModel.findOne({ category });

      if (product) {
        productByCategory.push(product);
      }
    }

    res.json({
      message: "",
      success: true,
      error: false,
      data: productByCategory,
    });

    // console.log("product category", productCategory);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryProduct;
