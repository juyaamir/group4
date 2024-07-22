import Order from "../models/Orders.js";

export const getAllOrders = async (req, res) => {
  try {
    const { price, type } = req.query;

    let userOrder;
    if (price) {
      userOrder = await Order.find({ price });
    } else {
      userOrder = await Order.find();
    }

    res.json(userOrder);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Create a single Order

 */

export const createSinglOrder = async (req, res) => {
  const { userid, price, productid } = req.body;

  //console.log(userid, price, productid);
  try {
    const order = new Order(req.body);
    const createdOrder = await order.save();
    res.json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Get a single Order by ID

 */
export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * Update a single Order by ID
 
 */
export const updateSingleOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * Delete a single order by ID

 */
export const deleteSingleOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
