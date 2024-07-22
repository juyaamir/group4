import mongoose from "mongoose";

const productsSchema = mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    category: {
      type: String,
      required: true,
    },
    /*   Image: {
      type: String,
      required: false,
    }, */
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productsSchema);

export default Products;
