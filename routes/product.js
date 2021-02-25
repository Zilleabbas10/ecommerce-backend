const express = require("express");
const router = express.Router();

const { productById, create, read } = require("../controllers/product")
const { userById} = require("../controllers/user")
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth")

router.get('/product/:productId', read)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);

router.param("userId", userById)
router.param("productId", productById)

module.exports = router;