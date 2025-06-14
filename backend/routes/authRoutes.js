
const express = require('express');

const { signup, login, logout, updateProfile, checkAuth} = require('../controllers/auth');
const {protectRoute} = require('../middlewares/authMiddle');

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

module.exports = router;