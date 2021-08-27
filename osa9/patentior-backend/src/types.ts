export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export interface PublicPatientArray {
  [index: number]: PublicPatient;
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

export type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

export enum HealthCheckRating {
  "Healthy",
  "LowRisk",
  "HighRisk",
  "CriticalRisk",
}

export interface EntryBase {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface OccupationalHealthcareEntry extends EntryBase {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends EntryBase {
  type: "Hospital";
  discharge?: {
    date: string;
    criteria: string;
  };
}

export interface HealthCheckEntry extends EntryBase {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
