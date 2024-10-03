import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const residentialComplexSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    images: {
      type: Array,
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
    floors: {
      type: Number,
      required: [true, "Floors number is required"]
    },
    entrances: {
      type: Number,
      required: [true, "Entrances number is required"]
    },
    location: {
      type: String,
      default: "Simferopolska, 2k, Dnipro, Dnipropetrovsk region",
    },
  },
  { versionKey: false }
);

residentialComplexSchema.post("save", handleSaveError);
residentialComplexSchema.pre("findOneAndUpdate", setUpdateSetting);
residentialComplexSchema.post("findOneAndUpdate", handleSaveError);

const Complex = model("residential_complex", residentialComplexSchema);

export default Complex;
