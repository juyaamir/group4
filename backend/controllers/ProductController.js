import Product from "../models/Products.js";

export const getAllproducts = async (req, res) => {
  try {
    const { productname, type } = req.query;

    let userproduct;
    if (productname) {
      userproduct = await Product.find({ productname });
    } else {
      userproduct = await Product.find();
    }

    res.json(userproduct);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Create a single Order

 */

export const createSinglproduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Get a single Order by ID

 */
export const getSingleproduct = async (req, res) => {
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
export const updateSingleproduct = async (req, res) => {
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
export const deleteSingleproduct = async (req, res) => {
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
