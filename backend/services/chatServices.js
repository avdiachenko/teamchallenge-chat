import mongoose from "mongoose";
import Message from "../models/Message.js";
import complexChat from "../models/ComplexChat.js";

export async function createMessage(message, chat) {
  const res = await Message.create(
    { 
      text: message.text, 
      user_id: message.user_id, 
      chat_type: chat.type,
      chat_id: chat.id,
    }
  );
  console.log(res);
  return { id: res.id, createdAt: res.createdAt };
}

export function getMessageById(id) {
  return Message.find({ _id: id });
}