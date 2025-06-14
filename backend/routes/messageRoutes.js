// const express = require('express');
// const {getUsersForSidebar,getMessages,sendMessage} = require('../controllers/message');
// const {protectRoute} = require('../middlewares/authMiddle');

// const router = express.Router();

// router.get("/users", protectRoute, getUsersForSidebar);
// router.get("/:id", protectRoute, getMessages);

// router.post("/send/:id", protectRoute, sendMessage);

// module.exports = router;

const express = require('express');
const {
  getUsersForSidebar,
  getMessages,
  sendMessage,
  createGroup,
  getGroupMessages,
  sendGroupMessage,
} = require('../controllers/message');
const { protectRoute } = require('../middlewares/authMiddle');

const router = express.Router();

// User chat routes
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

// // Group chat routes
// router.post("/group/create", protectRoute, createGroup);
// router.get("/group/:groupId", protectRoute, getGroupMessages);
// router.post("/group/send/:groupId", protectRoute, sendGroupMessage);

module.exports = router;
