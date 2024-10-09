import mongoose from "mongoose";
import Message from "../models/Message.js";
import complexChat from "../models/ComplexChat.js";
import User from "../models/User.js";
import ComplexChat from "../models/ComplexChat.js";

export async function createMessage(message, chat) {
  const res = await Message.create(
    { 
      text: message.text, 
      user_id: message.user_id, 
      chat_type: chat.type,
      chat_id: chat.id,
    }
  );

  return { id: res.id, createdAt: res.createdAt };
}

export function getMessageById(id) {
  return Message.find({ _id: id });
}

export async function getChatMessagesByMessage(id, count) {    
  let last_message = await Message.findById(id);
  let last_messages = await Message.find({ chat_type: last_message.chat_type, chat_id: last_message.chat_id })
    .lt("createdAt", last_message.createdAt)
    .sort({createdAt: -1})
    .limit(count);
    
  return last_messages;
}

export async function getUserChatsWithLastMessages(user_id, role) {    
  let user = await User.findById(user_id)
    .populate("apartment_id");
  await user.populate("apartment_id.building_id");
  await user.populate("apartment_id.building_id.residential_complex_id");

  const residential_chats = await ComplexChat.aggregate().match({ 
    residential_complex_id: new mongoose.Types.ObjectId(
      user.apartment_id.building_id.residential_complex_id
    )
  });
  for (const chat of residential_chats) {
    chat.lastMessage = (await Message.find(
      { chat_type: "residential_complex_chat", chat_id: chat._id }
    ).sort({createdAt: -1}).limit(1))[0];
  }

  // TODO: add building chats


  
  return residential_chats;
}