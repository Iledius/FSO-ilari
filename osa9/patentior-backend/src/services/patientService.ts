import patientData from "../../data/patients";
import {
  PublicPatientArray,
  PatientArray,
  NewPatientEntry,
  Gender,
  Patient,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";
import { toNewPatientEntry } from "../utils";

const getPatients = (): PatientArray => {
  return patientData.map((p) => {
    return { ...p, gender: p.gender as Gender };
  });
};

const getNonSensitivePatients = (): PublicPatientArray => {
  return patientData.map((patient) => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender as Gender,
      occupation: patient.occupation,
      entries: patient.entries,
    };
  });
};

const addPatient = (patient: NewPatientEntry) => {
  const newID = uuid();
  const newPatientEntry = { id: newID, ...toNewPatientEntry(patient) };

  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patientData.find((p) => p.id === id);
  if (patient) {
    return { ...patient, gender: patient.gender as Gender };
  }
  return undefined;
};

const addEntry = (id: string, entry: Entry): boolean => {
  const patient = patientData.find((p) => p.id === id);
  if (patient) {
    patient.entries.push(entry);
    return true;
  }
  return false;
};

const patientService = {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry,
};

export default patientService;
