import UsersAccount from "../../models/UsersAccount.js";
import bcrypt from bcryptjs;
//import { validationResult } from "express-validator";

//===========================
// get all user and query by name and type
//===========================

export const getAll = async (req, res) => {
  try {
    const user = await UsersAccount.find();

    res.status(200).json(accountUserUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//===========================
// Create one single user
//===========================

export const createOne = async (req, res) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const existingUser = await UsersAccount.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    //const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UsersAccount(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//===========================
// Get one single user
//===========================

export const getOne = async (req, res) => {
  try {
    const user = await UsersAccount.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//===========================
// Update one single user
//===========================

export const updateOne = async (req, res) => {
  try {
    const user = await UsersAccount.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//===========================
// Delete One
//===========================

export const deletOne = async (req, res) => {
  try {
    const user = await UsersAccount.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
