import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const apartmentSchema = new Schema(
  {
    building_id: {
      type: String,
      required: [true, "Residential complex is required"],
    },
    entrance: {
      type: Number,
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
