import mongoose from "mongoose";

const ordersSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UsersAccount",
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    //items array should refer products (one thing or many)
    itemname: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("products", ordersSchema);

export default Orders;
