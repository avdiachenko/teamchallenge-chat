/* eslint-disable no-console */
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { api } from "../../shared/api/api";
import { BASE_URL } from "../../shared/constants/urls";
import { User } from "../user/user.types";
import { ChatType, MessageType } from "./chat.types";

interface Store {
  socket: Socket | null;
  messages: MessageType[];
  selectedChat: ChatType | null;
  isLoading: boolean;

  getLastMessages: () => Promise<void>;
  setSelectedChat: (chat: ChatType | null) => void;
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
  sendMessage: (message: string, user: User) => void;
}

export const useChatStore = create<Store>((set, get) => ({
  socket: null,
  messages: [],
  selectedChat: null,
  isLoading: false,

  getLastMessages: async () => {
    const { messages } = get();
    if (!messages.length) return;
    set({ isLoading: true });

    try {
      const data: MessageType[] = await api(
        `/chat/last_messages?last_message_id=${messages[0]?._id}&message_count=10`
      );

      if (data) {
        set((state) => ({
          messages: [...data.reverse(), ...state.messages],
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedChat: (chat: ChatType | null) => {
    set({ selectedChat: chat });

    if (chat?.lastMessage) {
      set({ messages: [chat.lastMessage] });
    } else {
      set({ messages: [] });
    }
  },

  connectSocket: (token: string) => {
    const newSocket = io(BASE_URL, {
      auth: { token },
    });

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    newSocket.on("chat message", (res: MessageType) => {
      set((state) => ({ messages: [...state.messages, res] }));
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

  sendMessage: (message: string, user: User) => {
    const { socket, selectedChat } = get();
    if (!socket || !selectedChat) return;

    socket.emit(
      "chat message",
      { message, chat_id: selectedChat?._id, chat_type: selectedChat?.chatType },
      () => {
        const newMessage: MessageType = {
          user_id: user._id,
          text: message,
          images: [],
          chat_type: selectedChat?.chatType,
          chat_id: selectedChat?._id,
          _id: null,
          reactions: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          name: user.name,
          profilePicture: "",
        };

        set((state) => ({ messages: [...state.messages, newMessage] }));
      }
    );
  },
}));
