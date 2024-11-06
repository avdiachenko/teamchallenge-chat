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
  chats: ChatType[];

  getChats: () => void;
  getChat: (chatId: string | undefined, chatType: string | undefined) => ChatType | undefined;
  getLastMessages: () => Promise<void>;
  setSelectedChat: (chatId: string, chatType: string) => void;
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
  setChatLastMessage: (chat: ChatType, newLastMessage: MessageType) => void;
  sendMessage: (message: string, user: User) => void;
}

export const useChatStore = create<Store>((set, get) => ({
  socket: null,
  messages: [],
  selectedChat: null,
  isLoading: false,
  chats: [],

  getChats: async () => {
    const { chats } = get();
    if (chats.length) return;
    // set({ isLoading: true });

    try {
      const data: ChatType[] = await api(`/chat`);
      
      if (data) {
        set(() => ({
          chats: data,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      // set({ isLoading: false });
    }
  },

  getChat: (chatId: string | undefined, chatType: string | undefined) => {
    if (chatId === undefined || chatType === undefined) {
      return undefined;
    }
    for (const chat of get().chats) {
      if (chatId == chat._id && chatType == chat.chatType) {
        return chat;
      }
    }
  },

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

  setSelectedChat: (chatId: string, chatType: string) => {
    const selectedChat = get().getChat(chatId, chatType);
    set({ selectedChat: selectedChat });

    if (selectedChat?.lastMessage) {
      set({ messages: [selectedChat.lastMessage] });
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
      // TODO: if the message chat id and type are the selected chat - execute next line, else don't
      set((state) => ({ messages: [...state.messages, res] }));
      const chatOfTheMessage = get().getChat(res.chat_id, res.chat_type);

      if (chatOfTheMessage) {
        console.log("chat exists");
        get().setChatLastMessage(chatOfTheMessage, res);
      } else {
        console.log("chat does not exist");
      }
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

  setChatLastMessage(chat: ChatType, newLastMessage: MessageType) {
    set(() => ({
      chats: get().chats.map<ChatType>((c) => {
        if (c._id == chat._id && c.chatType == chat.chatType) {
          c.lastMessage = newLastMessage;
        }
        return c;
      }),
    }));
    console.log(get().chats);
  },

  sendMessage: (message: string, user: User) => {
    const { socket, selectedChat } = get();
    if (!socket || !selectedChat) return;

    socket.emit(
      "chat message",
      { message, chat_id: selectedChat?._id, chat_type: selectedChat?.chatType },
      (id: string) => {
        const newMessage: MessageType = {
          user_id: user._id,
          text: message,
          images: [],
          chat_type: selectedChat?.chatType,
          chat_id: selectedChat?._id,
          _id: id,
          reactions: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          name: user.name,
          profilePicture: "",
        };

        set((state) => ({ messages: [...state.messages, newMessage] }));

        if (selectedChat) {
          console.log(newMessage);
          
          get().setChatLastMessage(selectedChat, newMessage);
        }
      }
    );
  },
}));
