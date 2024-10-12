/* eslint-disable no-console */
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { BASE_URL } from "../../shared/constants/urls";
import { ChatType, MessageType } from "./chat.types";

interface Store {
  socket: Socket | null;
  messages: MessageType[];
  selectedChat: ChatType | null;

  setSelectedChat: (chat: ChatType | null) => void;
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
  sendMessage: (message: string) => void;
}

export const useChatStore = create<Store>((set, get) => ({
  socket: null,
  messages: [],
  selectedChat: null,

  setSelectedChat: (chat: ChatType | null) => {
    set({ selectedChat: chat });

    if (!chat) return;
    // set({ messages: chat.lastMessage });
  },

  connectSocket: (token: string) => {
    const newSocket = io(BASE_URL, {
      auth: { token },
    });

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    newSocket.on("chat message", (res: MessageType) => {
      set((state) => ({ messages: [...state.messages, res] })); // TODO: don't use arr = [...arr, a] because it's reeeally slow
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
      const newMessage = { name: null, message, date: Date.now(), profilePicture: null };
      set((state) => ({ messages: [...state.messages, newMessage] }));
    });
  },
}));
