import mongoose from "mongoose";

const ActivitySchema = mongoose.Schema(
  {
    activityname: {
      type: String,
      required: true,
    },

    Image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("products", ActivitySchema);

export default Activity;
