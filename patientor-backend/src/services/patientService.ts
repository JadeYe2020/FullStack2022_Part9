import patientData from "../../data/patients";
import { PatientEntry, NewPatienEntry, Patient, Gender } from "../types";
import { v1 as uuid } from "uuid";

const patients: PatientEntry[] = patientData;

const getPatient = (id: string): Patient | null => {
  const patientFound = patientData.find((p) => p.id === id);

  if (patientFound) {
    const gender = Object.entries(Gender).find(
      ([_key, value]) => value === patientFound.gender
    )?.[0] as Gender;
    return { ...patientFound, gender };
  } else {
    return null;
  }
};

const getEntries = (): PatientEntry[] => {
  return patients;
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
  getPatient,
  addPatient,
};
