import patientData from "../../data/patients";
import { Patient, PatientEntry, NewPatienEntry } from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientData;

const getEntries = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatienEntry): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
};
