import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const apartmentSchema = new Schema(
  {
    building_id: {
      type: String,
      required: [true, "Building id is required"],
      ref: "building",
    },
    number: {
      type: Number,
      required: [true, "Apartment number is required"],
    },
    entrance: {
      type: Number,
      required: [true, "Entrance number is required"],
    },
    services_debt: {
      type: Number,
      default: 0
    },
  },
  { versionKey: false }
);

apartmentSchema.post("save", handleSaveError);
apartmentSchema.pre("findOneAndUpdate", setUpdateSetting);
apartmentSchema.post("findOneAndUpdate", handleSaveError);

const Apartment = model("apartment", apartmentSchema);

export default Apartment;
