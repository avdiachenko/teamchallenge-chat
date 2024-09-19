import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const buildingSchema = new Schema(
  {
    residential_complex_id: {
      type: String,
      required: [true, "Residential complex is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    }
  },
  { versionKey: false }
);

buildingSchema.post("save", handleSaveError);
buildingSchema.pre("findOneAndUpdate", setUpdateSetting);
buildingSchema.post("findOneAndUpdate", handleSaveError);

const Building = model("building", buildingSchema);

export default Building;
