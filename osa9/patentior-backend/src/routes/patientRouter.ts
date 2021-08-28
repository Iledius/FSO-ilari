import express from "express";
import patientService from "../services/patientService";
import {
  PublicPatientArray,
  PublicPatient,
  NewPatientEntry,
  Patient,
} from "../types";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients: PublicPatientArray = patientService.getNonSensitivePatients();

  res.send(patients);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient: Patient | undefined = patientService.findById(id);

  res.send(patient);
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation, entries } = req.body;

  const newPatient: NewPatientEntry = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries,
  };

  const addedPatient: PublicPatient = patientService.addPatient(newPatient);

  res.json(addedPatient);
});

// Adding entries to patient

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;

  const { entry } = req.body;
  entry.id = uuidv4();
  console.log(entry);

  // Check if entry contains all required fields
  if (
    !entry.type ||
    !entry.date ||
    !entry.specialist ||
    !entry.description ||
    !entry.diagnosisCodes
  ) {
    res.status(400).send("Missing required fields");
  }

  if (entry.type === "HealthCheck") {
    if (!entry.healthCheckRating && entry.healthCheckRating !== 0) {
      console.log("Missing healthCheckRating");

      res.status(400).send("Missing required fields").end();
    }
  }
  if (entry.type === "Hospital") {
    if (!entry.discharge.date || !entry.discharge.criteria) {
      res.status(400).send("Missing required fields").end();
    }
  }
  if (entry.type === "OccupationalHealthcare") {
    if (!entry.sickLeave.startDate || !entry.sickLeave.endDate) {
      res.status(400).send("Missing required fields").end();
    }
  }

  if (patientService.addEntry(id, entry)) {
    res.status(201).send("Entry added");
  } else {
    res.status(404).send("Patient not found");
  }
});

export default router;
