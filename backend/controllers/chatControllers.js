import jwt from "jsonwebtoken";
import { findUserById } from "../services/userServices.js";
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
    if (token === undefined) {
      name = "Anonymous";
    } else {
      const id = jwt.verify(token, JWT_SECRET).id;
      const user = await findUserById(id);
      name = user.name;
    }
    let messageObject = { name, message: messageText };
    messageObject.date = Date.now();
    messageObject.profilePicture = "https://res.cloudinary.com/dtonpxhk7/image/upload/v1727784788/fvqcrnaneokovnfwcgya.jpg"
    // TODO: save to DB
    socket.broadcast.emit("chat message", messageObject);
    callback();
  }
}

export function chatMessageEventSubscribe(socket) {
  const processor = chatMessage(socket);
  socket.on("chat message", processor);
  return processor;
}