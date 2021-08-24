import patientData from "../../data/patients.json";
import {
  PatientNoSSNArray,
  PatientArray,
  NewPatientEntry,
  Gender,
} from "../types";
import { v1 as uuid } from "uuid";
import { toNewPatientEntry } from "../utils";

const getEntries = (): PatientArray => {
  return patientData.map((p) => {
    return { ...p, gender: p.gender as Gender };
  });
};

const getNonSensitiveEntries = (): PatientNoSSNArray => {
  return patientData.map((patient) => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender as Gender,
      occupation: patient.occupation,
    };
  });
};

const addPatient = (patient: NewPatientEntry) => {
  const newID = uuid();
  const newPatientEntry = { id: newID, ...toNewPatientEntry(patient) };
  patientData.push(newPatientEntry);

  return newPatientEntry;
};

const patientService = {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};

export default patientService;
