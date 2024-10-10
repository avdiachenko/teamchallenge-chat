import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const readUntilSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Choose the user of ReadUntil"],
    unique: true,
    sparse: true,
  },
  message_id: {
    type: Schema.Types.ObjectId,
    ref: "message",
    required: [true, "Choose the message of ReadUntil"],
  }
});

const buildingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Choose name of the chat"],
    },
    picture: {
      type: String,
    },
    building_id: {
      type: Schema.Types.ObjectId,
      ref: "building",
      required: [true, "Choose chat's building"],
    },
    user_read_until: [readUntilSchema]
  },
  { versionKey: false }
);

// TODO: unique name for chats in a building, using an index

buildingSchema.post("save", handleSaveError);
buildingSchema.pre("findOneAndUpdate", setUpdateSetting);
buildingSchema.post("findOneAndUpdate", handleSaveError);

const BuildingChat = model("building_chat", buildingSchema);

export default BuildingChat;
