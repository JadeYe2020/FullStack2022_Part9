import diagnoseData from "../../data/diagnoses";
import { diagnoseEntry } from "../types";

const getEntries = (): diagnoseEntry[] => {
  return diagnoseData;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose,
};
