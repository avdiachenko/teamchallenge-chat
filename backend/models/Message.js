import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const reactionSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Choose the sender of the reaction"],
      index: true
    },
    reaction: {
      type: String,
      required: [true, "Choose the reaction"],
    }
  }
);

const messageSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Choose the author of the message"],
    },
    text: {
      type: String,
      required: [true, "Message text is required"],
    },
    images: [{
      type: String
    }],
    responds_to_message_id: {
      type: Schema.Types.ObjectId,
      ref: "message",
    },
    reactions: [reactionSchema],
    chat_type: {
      type: String,
      enum: ["residential_complex_chat", "building_chat", "private_chat"],
      required: [true, "Choose the type of chat for a message"],
    },
    chat_id: {
      type: Schema.Types.ObjectId,
      refPath: "chat_type",
      required: [true, "Choose the chat for the message"],
    },
  },
  { versionKey: false, timestamps: true }
);

// make compound index for chat_type and chat_id
messageSchema.index({ chat_type: 1, chat_id: 1 });

messageSchema.post("save", handleSaveError);
messageSchema.pre("findOneAndUpdate", setUpdateSetting);
messageSchema.post("findOneAndUpdate", handleSaveError);

const Message = model("message", messageSchema);

export default Message;
