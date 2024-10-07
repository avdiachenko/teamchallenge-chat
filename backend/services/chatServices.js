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

export async function getChatMessages(id, count) {
  console.log("ID: ", id);
    
  let last_message = await Message.findById(id);
  let last_messages = await Message.find({ chat_type: last_message.chat_type, chat_id: last_message.chat_id })
    .lt("createdAt", last_message.createdAt)
    .sort()
    .limit(count);
    
  return last_messages;
}