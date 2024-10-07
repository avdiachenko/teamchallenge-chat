import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const privateChatSchema = new Schema(
  {
    user_1_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Choose members of the chat"],
    },
    user_2_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Choose members of the chat"],
    },
    user_1_read_until: {
      type: Schema.Types.ObjectId,
      ref: "message",
    },
    user_2_read_until: {
      type: Schema.Types.ObjectId,
      ref: "message",
    }
  },
  { versionKey: false }
);

privateChatSchema.post("save", handleSaveError);
privateChatSchema.pre("findOneAndUpdate", setUpdateSetting);
privateChatSchema.post("findOneAndUpdate", handleSaveError);

const PrivateChat = model("private_chat", privateChatSchema);

export default PrivateChat;
