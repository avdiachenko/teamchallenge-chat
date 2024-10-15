export interface MessageType {
  user_id: string;
  text: string;
  images: string[];
  chat_type: string;
  chat_id: string;
  _id: string;
  reactions: string[];
  createdAt: string;
  updatedAt: string;
  name: string;
  profilePicture: string;
}

export interface ChatType {
  _id: string;
  name: string;
  picture: string;
  residential_complex_id: string;
  user_read_until: string[];
  lastMessage: MessageType;
  chatType: string;
}
