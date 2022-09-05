import diagnoseData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnoseData;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose,
};
