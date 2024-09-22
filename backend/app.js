import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { createServer } from "node:http";
import { Server } from "socket.io";

import swaggerDocument from "./docs/swagger.json" assert { type: "json" };
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";
import complexRouter from "./routes/complexRouter.js";
import * as chatControllers from "./controllers/chatControllers.js";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use(express.static("upload/images"));

app.use("/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api", complexRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/chat", (_, res) => {
  res.send(`<script src="/socket.io/socket.io.js"></script>
<input type="text" id="chatInput">
<script>
  const socket = io(); // put URL as a parameter
  socket.emit("ping", ()=>{console.log("pong delivered to server")});
  socket.on("pong", ()=>{console.log("pong")});

  const input = document.getElementById("chatInput");
  input.onchange = () => {
    console.log(input.value);
    const message = document.createElement("p");
    message.innerHTML = input.value;
    document.body.insertBefore(message, document.body.lastElement);
    socket.emit("chat message", input.value, ()=>{
      console.log("chat message delivered")
    });
  }

  socket.on("chat message", (messageText) => {
    const message = document.createElement("p");
    message.innerHTML = messageText;
    message.style.color = "blue";
    document.body.insertBefore(message, document.body.lastElement);
  })
</script>`);
});

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://team-challenge-chat.netlify.app", "http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  chatControllers.pingEventSubscribe(socket);
  chatControllers.chatMessageEventSubscribe(socket);
});

const { DB_HOST, PORT = 4000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");

    server.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
