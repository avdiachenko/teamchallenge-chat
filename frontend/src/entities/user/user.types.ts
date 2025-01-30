export interface User {
  _id: string;
  role: "administrator" | "moderator" | "verified" | "not_verified";
  name: string;
  email: string;
  residential_complex?: string;
  entrance?: number;
  apartment?: number;
  section?: string;
  phone?: string;
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
  phone: string;
  email: string;
  password: string;
  residential_complex: string;
  apartment: number;
  entrance: number;
  section: string;
}
