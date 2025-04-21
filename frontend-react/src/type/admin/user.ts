export interface User  {
    id: number;
    email: string;
    name: string;
    avatar: string;
  };



 export interface Role {
    id: number;
    name: string;
    role: string;
  }
  
  export interface UserInfo {
    fullName: string;
    gender: string;
    birthday: string;
    address: string;
    phone: string;
    description?: string;
    image?: string;
  }
  
  export interface Users {
    id: number;
    email: string;
    name: string;
    picture?: string;
    role: Role;
    userInfo: UserInfo;
  }