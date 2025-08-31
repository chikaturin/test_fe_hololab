export interface Role {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface UserRole {
  userId: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
}

export interface User {
  _id: string;
  staffId: string;
  username: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userRoles: UserRole[];
}

export interface UserResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: User;
}
