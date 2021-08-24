import diagnosisData from "../../data/diagnoses.json"; // cached, so needs to be reloaded if you want to see changes. USE fs if you want to see changes.
import { DiagnosisArray } from "../types";

const getEntries = (): DiagnosisArray => {
  return diagnosisData;
};

const diagnosisService = {
  getEntries,
};

export default diagnosisService;
