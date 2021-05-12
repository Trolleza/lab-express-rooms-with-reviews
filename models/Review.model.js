const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  comment: { type: String, maxlength: 200 },
  roomId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }], 
});

module.exports = mongoose.model("Review", ReviewSchema);
