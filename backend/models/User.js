import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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
    residential_complex: {
      type: String,
      required: [true, "Residential complex is required"],
    },
    apartment_id: {
      type: Schema.Types.ObjectId,
      ref: "apartment",
    },
    entrance: {
      type: Number,
      required: [true, "Entrance nomber is required"],
    },
    phone: {
      type: String,
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
    role: {
      type: String,
      enum: ["not_verified", "verified", "moderator", "administrator"],
      default: "not_verified",
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSetting);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
