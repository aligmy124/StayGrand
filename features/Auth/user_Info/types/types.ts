export type JwtPayload = {
  _id?: string;
};

export type CurrentUserResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      _id: string;
      userName: string;
      email: string;
      phoneNumber: number;
      country: string;
      role: string;
      profileImage: string | null;
      verified: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
};
export type UserRole = "admin" | "user" | (string & {});
export interface ICurrentUser {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  role: UserRole;
  profileImage: string | null;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}