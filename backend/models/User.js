import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

// const condidion = function () {
//   return this.rights !== "administrator"; //required if role !== "administrator"
// };

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    profile_picture: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [8, "Password mast have at least 8 characters"],
      required: [true, "Password is required"],
    },
    // rights: {
    //   type: String,
    //   enum: ["administrator"],
    //   unique: true,
    // },
    residential_complex: {
      type: String,
      required: [true, "Residential complex is required"],
      // required: function () {
      //   return this.role !== "administrator"; //required if role !== "administrator"
      // },
    },
    section: {
      type: String,
      required: [true, "Section is required"],
    },
    entrance: {
      type: Number,
      required: [true, "Entrance nomber is required"],
    },
    apartment: {
      type: Number,
      required: [true, "Apartment nomber is required"],
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["not_verified", "verified", "moderator", "administrator"],
      default: "not_verified",
    },
    apartment_id: {
      type: Schema.Types.ObjectId,
      ref: "apartment",
    },
    token: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    tempCode: {
      type: String,
    },
    tempCodeTime: {
      type: Number,
    },
  },
  { versionKey: false }
);

// userSchema.pre("validate", function (next) {
//   if (!this.role) {
//     this.role = "not_verified"; // Устанавливаем значение по умолчанию, если не задано
//   }
//   next();
// });
userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSetting);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
