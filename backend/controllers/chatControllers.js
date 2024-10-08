import jwt from "jsonwebtoken";
import { createMessage, getChatMessagesByMessage, getMessageById } from "../services/chatServices.js";
import { findUserById } from "../services/userServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
const { JWT_SECRET } = process.env;

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
  return async (messageText, callback) => {
    let name = socket.user.name;
    let user_id = socket.user._id;
    let messageObject = { name, message: messageText };
    // TODO: change the mock chat
    let {createdAt, _id} = (await createMessage(
        {text: messageText, user_id: user_id }, 
        { type: "residential_complex_chat", id: "6704362330ad47b9a1403848" })
      );
    messageObject.date = createdAt;
    messageObject.id = _id;
    messageObject.profilePicture = "https://res.cloudinary.com/dtonpxhk7/image/upload/v1727784788/fvqcrnaneokovnfwcgya.jpg"
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

export default {
  getLastChatMessages: ctrlWrapper(getLastChatMessages),
};