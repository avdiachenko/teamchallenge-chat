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

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  residential_complex: string;
  apartment: number;
  entrance: number;
}
