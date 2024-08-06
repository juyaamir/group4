import UserImage from "../../models/UserImage.js";
import mongoose from "mongoose";

export const getAllImages = async (req, res) => {
  try {
    const { image } = req.query;

    //console.log(ctValue);

    let userimage;
    if (image) {
      userimage = await UserImage.find(image);
    } else {
      userimage = await UserImage.find();
    }

    res.json(userimage);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Create a single Order

 */

export const createSinglImage = async (req, res) => {
  try {
    /*  const { userid, image } = req.body; */
    console.log(req.body);

    const userimage = new UserImage(req.body);
    const createdUserimage = await userimage.save();
    res.json(createdUserimage);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Get a single Product by ID

 */
export const getSingleImage = async (req, res) => {
  /*  console.log(req.params.id); */
  let id = req.params.id;
  try {
    const userimage = await UserImage.find({ userid: { $eq: id } });
    if (!userimage) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json(userimage);
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
export const updateSingleImage = async (req, res) => {
  /* console.log(req.body);
  console.log(req.params.id); */

  const { userid, image } = req.body;
  try {
    const userimage = await UserImage.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!userimage) {
      return res.status(404).json({ message: "userimage not found" });
    }
    res.json(userimage);
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
export const deleteSingleImage = async (req, res) => {
  try {
    const userimage = await UserImage.findByIdAndDelete(req.params.id);
    if (!userimage) {
      return res.status(404).json({ message: "user iamge not found" });
    }
    res.json({ message: "User image deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
