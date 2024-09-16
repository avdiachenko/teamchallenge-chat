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
  return (message, callback) => {
    socket.broadcast.emit("chat message", message);
    callback();
  }
}

export function chatMessageEventSubscribe(socket) {
  const processor = chatMessage(socket);
  socket.on("chat message", processor);
  return processor;
}