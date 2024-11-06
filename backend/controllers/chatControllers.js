import { createMessage, getChatMessagesByMessage, getChatsWithLastMessages } from "../services/chatServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Roles from "../helpers/Roles.js";
import HttpError from "../helpers/HttpError.js";

function ping(socket) {
  return (callback) => {
    console.log("ping");
    socket.broadcast.emit("pong");
    callback();
  }
}

export function pingEventSubscribe(socket) {
  const processor = ping(socket);
  socket.on('ping', processor);
  return processor;
}

function getChatRoomName(chatType, chatId) {
  return `${chatType}@${chatId}`;
}

export async function setChatRooms(socket) {
  const chats = await getChatsWithLastMessages(socket.user);  
  for (const chat of chats) {    
    socket.join(getChatRoomName(chat.chatType, chat._id));
  }
}

function chatMessage(socket) {
  return async (incomingMessageObject, callback) => {
    const messageText = incomingMessageObject.message;
    let user_id = socket.user._id;
    let messageObject = (await createMessage(
        {text: messageText, user_id: user_id }, 
        { type: incomingMessageObject.chat_type, id: incomingMessageObject.chat_id })
      );
    messageObject.name = socket.user.name;
    messageObject.profilePicture = socket.user.profile_picture || "https://res.cloudinary.com/dtonpxhk7/image/upload/v1727784788/fvqcrnaneokovnfwcgya.jpg";
    console.log(getChatRoomName(messageObject.chat_type, messageObject.chat_id));
    
    socket.to(getChatRoomName(messageObject.chat_type, messageObject.chat_id))
      .emit("chat message", messageObject);
    callback(messageObject._id);
  }
}

export function chatMessageEventSubscribe(socket) {
  const processor = chatMessage(socket);
  socket.on("chat message", processor);
  return processor;
}

async function getLastChatMessages(req, res) {
  const _id = req.query.last_message_id;
  const count = req.query.message_count;
  
  const messages = await getChatMessagesByMessage(_id, count);
  
  res.json(messages);
}

async function getChats(req, res) {
  const chats = await getChatsWithLastMessages(req.user);  
  res.json(chats);
}

export default {
  getLastChatMessages: ctrlWrapper(getLastChatMessages),
  getChats: ctrlWrapper(getChats),
};