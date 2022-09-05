import patientData from "../../data/patients";
import {
  PatientToDisplay,
  PatientEntry,
  NewPatienEntry,
  Patient,
  Entry,
  Gender,
} from "../types";
import { v1 as uuid } from "uuid";

const patients: PatientToDisplay[] = patientData;

const getPatient = (id: string): Patient | null => {
  const patientFound = patientData.find((p) => p.id === id);
  const entries: Entry[] = [];

  if (patientFound) {
    const gender = Object.entries(Gender).find(
      ([_key, value]) => value === patientFound.gender
    )?.[0] as Gender;
    return { ...patientFound, gender, entries };
  } else {
    return null;
  }
};

const getEntries = (): PatientToDisplay[] => {
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
  getPatient,
  addPatient,
};
