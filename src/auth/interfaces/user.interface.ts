import { IProfessionalData } from "src/cv_data/professional-data/interfaces/IProfesionnalData";
export interface IUser  {
  id?: string;
  email: string;
  username: string;
  password: string;
  is_confirmed: boolean;
  role: String;
  professionalData?: IProfessionalData; // Reference to ProfessionalData
}
