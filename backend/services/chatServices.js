import mongoose from "mongoose";
import Message from "../models/Message.js";
import complexChat from "../models/ComplexChat.js";
import User from "../models/User.js";
import ComplexChat from "../models/ComplexChat.js";
import BuildingChat from "../models/BuildingChat.js";
import Complex from "../models/Complex.js";
import Roles from "../helpers/Roles.js";

export async function createMessage(message, chat) {
  const res = await Message.create(
    { 
      text: message.text, 
      user_id: message.user_id, 
      chat_type: chat.type,
      chat_id: chat.id,
    }
  );
  return res.toObject();
}

export function getMessageById(id) {
  return Message.find({ _id: id }).lean();
}

export async function getChatMessagesByMessage(id, count) {    
  let last_message = await Message.findById(id);
  let last_messages = await Message.find({ chat_type: last_message.chat_type, chat_id: last_message.chat_id })
    .lt("createdAt", last_message.createdAt)
    .sort({createdAt: -1})
    .limit(count)
    .lean();

  for (const message of last_messages) {
    const user_id = message.user_id;
    const user = await User.findById(user_id);
    message.profilePicture = user.profile_picture || "https://res.cloudinary.com/dtonpxhk7/image/upload/v1727784788/fvqcrnaneokovnfwcgya.jpg";
    message.name = user.name;
  }
    
  return last_messages;
}

export async function getChatsWithLastMessages(user) {
  let chats;  
  if (Roles.compareRoles("verified", user.role) == 0) {
    chats = await getUserChatsWithLastMessages(user._id);
  } else if (Roles.compareRoles("moderator", user.role) == 0) {
    chats = await getModeratorChatsWithLastMessages(user._id);
  } else if (Roles.compareRoles("administrator", user.role) == 0) {
    chats = await getAdministratorChatsWithLastMessages();
  } else {
    throw new HttpError(500, "getChats role not supported");
  }
  return chats;
}

async function getUserChatsWithLastMessages(user_id) {    
  let user = await User.findById(user_id)
    .populate("apartment_id");
  await user.populate("apartment_id.building_id");
  await user.populate("apartment_id.building_id.residential_complex_id");

  const residential_chats = await ComplexChat.aggregate().match({ 
    residential_complex_id: new mongoose.Types.ObjectId(
      user.apartment_id.building_id.residential_complex_id
    )
  });
  await populateChatsWithLastMessages(residential_chats, "residential_complex_chat");
  await populateChatsWithChatTypes(residential_chats, "residential_complex_chat");

  const building_chats = await BuildingChat.aggregate().match({ 
    building_id: new mongoose.Types.ObjectId(
      user.apartment_id.building_id._id
    )
  });
  await populateChatsWithLastMessages(building_chats, "building_chat");
  await populateChatsWithChatTypes(building_chats, "building_chat");
  
  return residential_chats.concat(building_chats);
}

async function getModeratorChatsWithLastMessages(moderator_id) {    
  let moderator = await User.findById(moderator_id)
    .populate("apartment_id");
  await moderator.populate("apartment_id.building_id");
  await moderator.populate("apartment_id.building_id.residential_complex_id");

  const residential_chats = await ComplexChat.aggregate().match({ 
    residential_complex_id: new mongoose.Types.ObjectId(
      moderator.apartment_id.building_id.residential_complex_id
    )
  });
  await populateChatsWithLastMessages(residential_chats, "residential_complex_chat");
  await populateChatsWithChatTypes(residential_chats, "residential_complex_chat");

  const complexWithBuildings = await Complex.aggregate()
    .match({ 
      _id: new mongoose.Types.ObjectId(
        moderator.apartment_id.building_id.residential_complex_id
      )
    })
    .addFields({ _id_string: { $toString: "$_id" }})
    .lookup({
      from: "buildings", // collection name in db
      "localField": "_id_string",
      "foreignField": "residential_complex_id",
      as: "buildings"
    });  
  let building_ids = complexWithBuildings[0].buildings.map(b => b._id);
  const building_chats = await BuildingChat.find({ building_id: building_ids }).lean();
  await populateChatsWithLastMessages(building_chats, "building_chat");
  await populateChatsWithChatTypes(building_chats, "building_chat");
  
  return residential_chats.concat(building_chats);
}

async function getAdministratorChatsWithLastMessages() {
  const complexes = await Complex.find();
  let residential_complex_ids = complexes.map(c => c._id);
  const complex_chats = await ComplexChat.find({ residential_complex_id: residential_complex_ids }).lean();
  await populateChatsWithLastMessages(complex_chats, "residential_complex_chat");
  await populateChatsWithChatTypes(complex_chats, "residential_complex_chat");
  return complex_chats;
}

async function populateChatsWithLastMessages(chats, chatsType) {
  for (const chat of chats) {
    chat.lastMessage = (await Message.find(
      { chat_type: chatsType, chat_id: chat._id }
    ).sort({createdAt: -1}).limit(1).lean())[0];
    if (chat.lastMessage) {
      const user_id = chat.lastMessage.user_id;
      const user = await User.findById(user_id).lean();
      chat.lastMessage.profilePicture = user.profile_picture || "https://res.cloudinary.com/dtonpxhk7/image/upload/v1727784788/fvqcrnaneokovnfwcgya.jpg";
      chat.lastMessage.name = user.name;
    }
  }
}

async function populateChatsWithChatTypes(chats, chatsType) {
  for (const chat of chats) chat.chatType = chatsType;
}