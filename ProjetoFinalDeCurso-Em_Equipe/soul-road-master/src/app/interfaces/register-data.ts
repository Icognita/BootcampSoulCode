export interface RegisterData {
  fullname: string;
  email: string;
  birthdate: Date;
  password: string;
  state: string;
  country: string;
  classroom: string;
  phoneNumber: string;
  isAdmin: string;
  isTeacher: string;
  picProfile: string;
  badges: string[];
  key?: string,  
  userAuthorization: boolean; 
  userPoints: number 
} 