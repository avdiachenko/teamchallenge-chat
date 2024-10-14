export interface MessageType {
  name?: string | null;
  message?: string;
  date?: number;
  profilePicture?: string | null;
  _id?: string;
  user_id?: string;
  text?: string;
  images?: string[];
  chat_type?: string;
  chat_id?: string;
  reactions?: string[];
  createdAt?: string;
  updatedAt?: string;
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
