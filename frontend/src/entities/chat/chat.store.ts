/* eslint-disable no-console */
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { BASE_URL } from "../../shared/constants/urls";

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
    const newSocket = io(BASE_URL, {
      auth: { token },
    });

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newSocket.on("chat message", (res: any) => {
      set((state) => ({ messages: [...state.messages, res.name + ": " + res.message] })); // TODO: don't use arr = [...arr, a] because it's reeeally slow
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
