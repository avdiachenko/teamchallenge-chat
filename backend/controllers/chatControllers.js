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
    const token = socket.handshake.auth.token;
    let name;
    let user_id;
    if (token === undefined) {
      name = "Anonymous";
      user_id = 0;
    } else {
      user_id = jwt.verify(token, JWT_SECRET).id;
      const user = await findUserById(user_id);
      name = user.name;
    }
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