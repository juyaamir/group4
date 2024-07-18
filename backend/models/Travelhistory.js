import mongoose from "mongoose";

const travelSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Accountdetails",
  },

  location: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },

  price: {
    type: String,
    required: true,
  },
});

const Travelhistory = mongoose.model("Travelhistory", travelSchema);

export default Travelhistory;
