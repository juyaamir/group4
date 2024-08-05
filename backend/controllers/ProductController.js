import Product from "../models/Products.js";
import mongoose from "mongoose";

export const getAllProducts = async (req, res) => {
  try {
    const { productName } = req.query;
    const ct = req.query;

    let ctValue = ct["category"];
    //console.log(ctValue);

    let userProduct;
    if (productName) {
      userProduct = await Product.find(productName);
    }
    if (ctValue) {
      userProduct = await Product.find({ category: { $eq: ctValue } });
    } else {
      userProduct = await Product.find();
    }

    res.json(userProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Create a single Order

 */

export const createSinglProduct = async (req, res) => {
  try {
    if (req.body.favArray) {
      console.log(req.body.favArray);
      const { favArray } = req.body;
      const favproducts = await Product.find({ _id: { $in: favArray } });
      res.json(favproducts);
      return;
    }
    if (req.body.productArray) {
      console.log(req.body);
      const { productArray } = req.body;
      const products = await Product.findOne({ _id: { $in: productArray } });
      res.json(products);
      return;
    }
    const { porductname, price, category, image } = req.body;
    console.log(porductname, price, category, image);

    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Get a single Product by ID

 */
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * Update a single Product by ID
 
 */
export const updateSingleProduct = async (req, res) => {
  /* console.log(req.body);
  console.log(req.params.id); */

  const { porductname, price, category } = req.body;
  console.log(porductname, price, category);
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * Delete a single Product by ID

 */
export const deleteSingleProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
