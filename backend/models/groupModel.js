// const mongoose = require('mongoose');

// const groupSchema = new mongoose.Schema(
//     {
//       name: {
//         type: String,
//         required: true,
//       },
//       members: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       }],
//       admin: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//     },
//     { timestamps: true }
//   );
  
//   const Group = mongoose.model("Group", groupSchema);
  
//   module.exports = Group;