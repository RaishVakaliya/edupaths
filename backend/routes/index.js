const express = require("express");

const router = express.Router();

const userSignUpcontroller = require("../controller/user/userSignUp");
const userSignIncontroller = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countCartProductController = require("../controller/user/countCartProductController");
const cartProductView = require("../controller/user/cartProductView");
const updateCartProduct = require("../controller/user/updateCartProduct");
const deleteCartProduct = require("../controller/user/deleteCartProduct");
const searchproduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");

router.post("/signup", userSignUpcontroller);
router.post("/signin", userSignIncontroller);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

//admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

//product
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchproduct);
router.post("/filter-product", filterProductController);

//user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countCartProduct", authToken, countCartProductController);
router.get("/view-cart-product", authToken, cartProductView);
router.post("/update-cart-product", authToken, updateCartProduct);
router.post("/delete-cart-product", authToken, deleteCartProduct);

module.exports = router;
