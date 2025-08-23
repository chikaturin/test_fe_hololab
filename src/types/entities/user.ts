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
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  address: string | null;
  isActive: boolean;
  lastLogin: string | null;
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
