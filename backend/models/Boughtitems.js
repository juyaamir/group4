import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Accountdetails",
  },

  itemname: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },

  itemprice: {
    type: String,
    required: true,
  },
  itemunits: {
    type: String,
    required: true,
  },
});

const Boughtitem = mongoose.model("Boughtitem", userSchema);

export default Boughtitem;
