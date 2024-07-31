import mongoose from "mongoose";

const ordersSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "UsersAccount",
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    //items array should refer products (one thing or many)
    productname: [
      {
        type: "String",
        required: true,
        ref: "Products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", ordersSchema);

export default Orders;
