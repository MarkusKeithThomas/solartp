
export interface JobList {
    id:number;
    title:string;
    placeWork:string;
    slug:string;
    experience:string;
    datOutOfDate:string;
    htmlContent:string;

}

export interface FormState {
  fullName: string;
  phone: string;
  email: string;
  experience: string;
  file: File | null;
}

export interface JobFormResponse {
    id:number;
    fullName: string;
    phone: string;
    email: string;
    experience: string;
    fileName: string;
    filePath:string;
}