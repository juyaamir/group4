import mongoose from "mongoose";

const ordersSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Accountdetails",
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    itemname: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("products", ordersSchema);

export default Orders;
