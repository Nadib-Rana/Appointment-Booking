import { Document } from "mongoose";

export interface IAvailability {
  date: Date;
  slots: string[];
}

export interface IEducation {
  degree: string;
  institution: string;
  year: number;
  fieldOfStudy?: string; // Optional enhancement
}

export interface IDoctor extends Document {
  name: string;
  specialization: string;
  experience: number;
  email: string;
  phone?: string;
  availability: IAvailability[];
  fee:Number;
  joblocation:String;
  designation:String;
  clinic: {
    name?: string;
    address?: string;
    city?: string;
  };
  profileImage?: string;
  education?: IEducation[];

}