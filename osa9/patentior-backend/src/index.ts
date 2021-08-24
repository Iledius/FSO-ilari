import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnosisRouter";
import patientRouter from "./routes/patientRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
