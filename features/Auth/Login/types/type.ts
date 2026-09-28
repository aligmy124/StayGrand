export interface LoginRequset {
  email: string;
  password: string;
}
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      _id: string;
      userName: string;
      role: string;
    };
    token: string;
  };
}
