import express from "express";
import patientService from "../services/patientService";
import { PatientNoSSNArray, PatientNoSSN, NewPatientEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients: PatientNoSSNArray = patientService.getNonSensitiveEntries();

  res.send(patients);
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const newPatient: NewPatientEntry = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  const addedPatient: PatientNoSSN = patientService.addPatient(newPatient);

  res.json(addedPatient);
});

export default router;
