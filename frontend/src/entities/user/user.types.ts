export interface LoginData {
  token: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
  };
}

export interface AuthData {
  email: string;
  password: string;
}
