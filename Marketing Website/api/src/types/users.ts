export type Role = "admin" | "visit" | "client"

export type User = {
    email: string;
    password: string;
    role: Role;
  };

export type UserRegistration = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: Role;
  };
  
  export type UserLogin = {
    email: string;
    password: string;
  };