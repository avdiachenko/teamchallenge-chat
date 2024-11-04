import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const optionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});
const optionUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isVote: {
    type: Boolean,
    default: false,
  },
});
const votedUserSchema = new Schema({
  votedUserId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  votedUserOptions: [optionUserSchema],
});

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
    options: [optionSchema],
    // {
    //   up: {
    //     type: Number,
    //     default: 0,
    //   },
    //   down: {
    //     type: Number,
    //     default: 0,
    //   },
    //   abstained: {
    //     type: Number,
    //     default: 0,
    //   },
    //   type: String,
    //   enum: ["Up", "Down", "Abstained"],
    //   required: [true, "Make your choice!"],
    // },
    startDate: {
      type: Date,
      required: [true, "Specify start date"],
    },
    endDate: {
      type: Date,
    },
    displayType: {
      type: String,
      enum: ["Percentages", "Number"],
      required: [true, "Make your choice!"],
    },
    isAnonymous: {
      type: Boolean,
      default: true,
    },
    votedUsers: [votedUserSchema],
  },
  { versionKey: false }
);

votingSchema.post("save", handleSaveError);
votingSchema.pre("findOneAndUpdate", setUpdateSetting);
votingSchema.post("findOneAndUpdate", handleSaveError);

const Voting = model("voting", votingSchema);

export default Voting;
