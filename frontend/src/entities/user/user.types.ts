export interface User {
  _id: string;
  role: "administrator" | "moderator" | "verified" | "not_verified";
  name: string;
  email: string;
  buildings?: { addresses: string[]; residential_complex_id: string }[];
  entrance?: number;
  apartment?: number;
  section?: string;
  phone?: string;
  is_admin?: boolean;
}

export interface LoginData {
  token: string;
  refreshToken: string;
  user: User;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  phone: string;
}
