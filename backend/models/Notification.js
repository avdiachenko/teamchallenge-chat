import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const notificationSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Type text"],
    },
    type: {
      type: String,
      enum: ["Events", "Emergency"],
      required: [true, "Choose the type of notification!"],
    },
    residential_complex: {
      type: String,
      required: [true, "Choose the residential complex!"],
    },
    building_id: {
      type: Schema.Types.ObjectId,
      ref: "building",
    },
  },
  { versionKey: false, timestamps: true }
);

notificationSchema.post("save", handleSaveError);
notificationSchema.pre("findOneAndUpdate", setUpdateSetting);
notificationSchema.post("findOneAndUpdate", handleSaveError);

const Notification = model("notification", notificationSchema);

export default Notification;
