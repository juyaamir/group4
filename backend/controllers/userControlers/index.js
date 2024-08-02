import UsersAccount from "../../models/UsersAccount.js";
import bcrypt from "bcryptjs";

// import bcrypt from "bcrypt";
//import { validationResult } from "express-validator";

//===========================
// get all user and query by name and type
//===========================

export const getAll = async (req, res) => {
  try {
    const user = await UsersAccount.find();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//===========================
// Create one single user
//===========================

export const createOne = async (req, res) => {
  try {
    const { email } = req.body;
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

    const user = await UsersAccount.create(req.body);

    res.status(201).json({ message: "User created successfully", user });
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
    // console.log(user)
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
    const {id}=req.params
    const user = await UsersAccount.findById(id)
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    
    if (user) {
      console.log("user",req.body)
      user.firstname = req.body.firstname || user.firstname
      user.lastname = req.body.lastname || user.lastname
      user.email = req.body.email || user.email
      if (req.body.password) {
        // const salt = await bcrypt.genSalt(10);
        // const pass = await bcrypt.hash(req.body.password, salt);
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
      console.log("updatedUser",updatedUser)
  
      res.json(updatedUser)
      // res.json({
      //   _id: updatedUser._id,
      //   name: updatedUser.name,
      //   email: updatedUser.email,
      //   isAdmin: updatedUser.isAdmin,
      //   token: generateToken(updatedUser._id),
      // })
    }
  // }

    // const newUser = req.body
    // console.log(newUser, pass)
    // const user = await UsersAccount.findByIdAndUpdate(req.params.id, req.body, {
      // new: true,
      // runValidators: true,
    // });
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    // res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

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
