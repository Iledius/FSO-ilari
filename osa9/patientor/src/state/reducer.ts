import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";
import axios from "axios";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | { type: "SET_DIAGNOSES"; payload: Diagnosis[] }
  | { type: "ADD_ENTRY"; payload: { patientId: string; entry: Entry } };

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const addEntry = (patientId: string, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { patientId, entry },
  };
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
        },
      };
    case "ADD_ENTRY":
      const { patientId, entry } = action.payload;
      const patient: Patient = state.patients[patientId];
      console.log(patient);

      axios
        .post(`http://localhost:3001/api/patients/${patientId}/entries`, {
          entry,
        })
        .catch((err) => {
          console.log(err);
        });
      return {
        ...state,
        patients: {
          ...state.patients,
          [patientId]: {
            ...patient,
            entries: [...patient.entries, entry],
          },
        },
      };
    default:
      return state;
  }
};
