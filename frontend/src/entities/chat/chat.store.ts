/* eslint-disable no-console */
import { io, Socket } from "socket.io-client";
import { create } from "zustand";

interface Store {
  socket: Socket | null;
  messages: string[];

  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
  sendMessage: (message: string) => void;
}

export const useChatStore = create<Store>((set, get) => ({
  socket: null,
  messages: [],

  connectSocket: (token: string) => {
    const newSocket = io("https://teamchallenge-chat-jmsz.onrender.com", {
      auth: { token },
    });

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    newSocket.on("chat message", (message: string) => {
      set((state) => ({ messages: [...state.messages, message] }));
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (!socket) return;
    socket.close();
    set({ socket: null });
  },

  sendMessage: (message: string) => {
    const { socket } = get();
    if (!socket) return;
    socket.emit("chat message", message, () => {
      set((state) => ({ messages: [...state.messages, message] }));
    });
  },
}));
