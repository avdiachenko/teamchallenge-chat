import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";
import { boolean } from "joi";

const votingSchema = new Schema(
  {
    headline: {
      type: String,
      required: [true, "Headline is required"],
    },
    description: {
      type: String,
    },
    votingType: {
      type: String,
      enum: ["Single", "Multiple"],
      required: [true, "Choose the type of voting!"],
    },
    options: {
      type: String,
      enum: ["Up", "Down", "Abstained"],
      required: [true, "Make your choice!"],
    },
    startDate: {
      type: Date,
      enum: ["Up", "Down", "Abstained"],
      required: [true, "Make your choice!"],
    },
    endDate: {
      type: Date,
    },
    displayType: {
      type: String,
      enum: ["Up", "Down", "Abstained"],
      required: [true, "Make your choice!"],
    },
    isAnonymous: {
      type: boolean,
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    // },
  },
  { versionKey: false }
);

votingSchema.post("save", handleSaveError);
votingSchema.pre("findOneAndUpdate", setUpdateSetting);
votingSchema.post("findOneAndUpdate", handleSaveError);

const Voting = model("voting", votingSchema);

export default Voting;
