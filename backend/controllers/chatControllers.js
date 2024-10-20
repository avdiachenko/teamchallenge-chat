import { createMessage, getAdministratorChatsWithLastMessages, getChatMessagesByMessage, getModeratorChatsWithLastMessages, getUserChatsWithLastMessages } from "../services/chatServices.js";
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
    // TODO: send message into a room
    socket.broadcast.emit("chat message", messageObject);
    callback();
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
  const user = req.user;
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
  
  res.json(chats);
}

export default {
  getLastChatMessages: ctrlWrapper(getLastChatMessages),
  getChats: ctrlWrapper(getChats),
};