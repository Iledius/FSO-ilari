export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PatientNoSSN = Omit<Patient, "ssn">;

export interface PatientNoSSNArray {
  [index: number]: PatientNoSSN;
}

export interface PatientArray {
  [index: number]: Patient;
}

export interface NewPatientEntry extends Omit<Patient, "id"> {}

export interface Diagnosis {
  code: string;
  name: string;
  latin: string;
}

export interface DiagnosisArray {
  [index: number]: Partial<Diagnosis>;
}
