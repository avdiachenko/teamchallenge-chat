import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const residentialComplexSchema = new Schema(
  {
    images: {
      type: String,
      required: [true, "Image(s) is required"],
    },
    parking: {
      type: Boolean,
      default: false,
    },
    security: {
      type: Boolean,
      default: false,
    },
    access_control: {
      type: Boolean,
      default: false,
    },
    concierge: {
      type: Boolean,
      default: false,
    },
    playground: {
      type: Boolean,
      default: false,
    },
    closed_area: {
      type: Boolean,
      default: false,
    },
    video_surveillance: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "41.40338,2.17403",
    },
  },
  { versionKey: false }
);

residentialComplexSchema.post("save", handleSaveError);
residentialComplexSchema.pre("findOneAndUpdate", setUpdateSetting);
residentialComplexSchema.post("findOneAndUpdate", handleSaveError);

const Complex = model("residential_complex", residentialComplexSchema);

export default Complex;
