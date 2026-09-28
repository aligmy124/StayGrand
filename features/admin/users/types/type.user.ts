interface BaseResponse {
  success: boolean;
  message: string;
}

export type UserRole = "user" | "admin";

export interface IUser {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  role: UserRole;
  profileImage: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGetUsersResponse extends BaseResponse {
  data: {
    users: IUser[];
    totalCount: number;
  };
}

export interface IPagination {
  page?: number;
  size?: number;
}