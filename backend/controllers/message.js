const User= require("../models/userModel.js");
const Message= require("../models/messageModel.js");
const cloudinary= require("../lib/cloudinary.js");
const { io, getReceiverSocketId } = require("../lib/socket.js");
const Group= require("../models/groupModel.js");



exports.getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image:imageUrl,
    })
    console.log("type: ", typeof getReceiverSocketId);
    const receiverSocketId= getReceiverSocketId(receiverId);

    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Send Message (Supports Group & Direct Messages)
// exports.sendMessage = async (req, res) => {
//   try {
//     const { text, image, groupId } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let imageUrl;
//     if (image) {
//       const uploadResponse = await cloudinary.uploader.upload(image);
//       imageUrl = uploadResponse.secure_url;
//     }

//     const newMessage = await Message.create({
//       senderId,
//       receiverId: groupId ? null : receiverId,
//       groupId: groupId || null,
//       text,
//       image: imageUrl,
//     });

//     if (groupId) {
//       const group = await Group.findById(groupId).populate("members");
//       group.members.forEach((member) => {
//         const memberSocketId = getReceiverSocketId(member._id);
//         if (memberSocketId) {
//           io.to(memberSocketId).emit("newGroupMessage", newMessage);
//         }
//       });
//     } else {
//       const receiverSocketId = getReceiverSocketId(receiverId);
//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit("newMessage", newMessage);
//       }
//     }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Create a Group
// exports.createGroup = async (req, res) => {
//   try {
//     const { name, members } = req.body;
//     const admin = req.user._id;

//     const newGroup = await Group.create({
//       name,
//       members: [...members, admin],
//       admin,
//     });

//     res.status(201).json(newGroup);
//   } catch (error) {
//     console.log("Error in createGroup controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Get Group Messages
// exports.getGroupMessages = async (req, res) => {
//   try {
//     const { id: groupId } = req.params;
//     const messages = await Message.find({ groupId });

//     res.status(200).json(messages);
//   } catch (error) {
//     console.log("Error in getGroupMessages controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

