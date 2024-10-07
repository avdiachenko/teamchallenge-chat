import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const readUntilSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Choose the user of ReadUntil"],
    unique: true,
  },
  message_id: {
    type: Schema.Types.ObjectId,
    ref: "message",
    required: [true, "Choose the message of ReadUntil"],
  }
});

const complexChatSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Choose name of the chat"],
    },
    picture: {
      type: String,
    },
    residential_complex_id: {
      type: Schema.Types.ObjectId,
      ref: "residential_complex",
      required: [true, "Choose the message of ReadUntil"],
    },
    user_read_until: [readUntilSchema]
  },
  { versionKey: false }
);

// TODO: unique name for 

complexChatSchema.post("save", handleSaveError);
complexChatSchema.pre("findOneAndUpdate", setUpdateSetting);
complexChatSchema.post("findOneAndUpdate", handleSaveError);

const ComplexChat = model("residential_complex_chat", complexChatSchema);

export default ComplexChat;
