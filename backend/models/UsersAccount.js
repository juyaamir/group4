import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minLength: 2,
    required: true,
  },
  lastname: {
    type: String,
    minLength: 2,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UsersAccount = mongoose.model("UsersAccount", userSchema);

export default UsersAccount;

// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//   {
//     firstname: {
//       type: String,
//       minLength: 2,
//       required: true,
//     },
//     lastname: {
//       type: String,
//       minLength: 2,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     // isAdmin: {
//     //   type: Boolean,
//     //   required: true,
//     //   default: false,
//     // },
//     //hobbies, age,nationality,interests (dont keep it required)
//   }
//   // {
//   //   timestamps: true,
//   // }
// );

// // userSchema.methods.matchPassword = async function (enteredPassword) {
// //   return await bcrypt.compare(enteredPassword, this.password);
// // };

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// const UsersAccount = mongoose.model("usersaccounts", userSchema);

// export default UsersAccount;
