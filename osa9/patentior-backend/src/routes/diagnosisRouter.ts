import express from "express";
import diagnosisService from "../services/diagnosisService";
import { DiagnosisArray } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses: DiagnosisArray = diagnosisService.getEntries();
  res.send(diagnoses);
});

export default router;
