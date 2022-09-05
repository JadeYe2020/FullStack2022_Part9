import { NewPatienEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseTextField = (input: unknown, fieldName: string) => {
  if (!input || !isString(input)) {
    throw new Error(`Incorrect or missing ${fieldName} info`);
  }
  return input;
};

const parseDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date of birth info");
  }
  return date;
};

const parseGender = (gender: unknown) => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender info");
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatienEntry = (obj: any): NewPatienEntry => {
  const newEntry: NewPatienEntry = {
    name: parseTextField(obj.name, "name"),
    dateOfBirth: parseDate(obj.dateOfBirth),
    gender: parseGender(obj.gender),
    occupation: parseTextField(obj.occupation, "occupation"),
    ssn: parseTextField(obj.ssn, "ssn"),
  };

  return newEntry;
};

export default toNewPatienEntry;
