import mongoose from "mongoose";

const userimageSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "UsersAccount",
    },
    image: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

const Userimage = mongoose.model("UserImage", userimageSchema);

export default Userimage;
