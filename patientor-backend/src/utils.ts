import {
  NewPatientEntry,
  Gender,
  NewMedEntry,
  EntryType,
  HealthCheckRating,
  Discharge,
} from "./types";

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
const toNewPatientEntry = (obj: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseTextField(obj.name, "name"),
    dateOfBirth: parseDate(obj.dateOfBirth),
    gender: parseGender(obj.gender),
    occupation: parseTextField(obj.occupation, "occupation"),
    ssn: parseTextField(obj.ssn, "ssn"),
  };

  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

const parseType = (type: unknown) => {
  if (!type || !isType(type)) {
    throw new Error("Incorrect or missing type");
  }
  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthRating = (rating: unknown) => {
  if ((!rating && rating !== 0) || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing rating");
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischargeInfo = (param: any): param is Discharge => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return (
    Object.getOwnPropertyNames(param).includes("date") &&
    Object.getOwnPropertyNames(param).includes("criteria")
  );
};

const parseDischargeInfo = (info: unknown) => {
  if (!info || !isDischargeInfo(info)) {
    throw new Error("Incorrect or missing discharge info");
  }
  return info;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewMedEntry = (obj: any): NewMedEntry => {
  const description = parseTextField(obj.description, "description");
  const date = parseTextField(obj.date, "date");
  const specialist = parseTextField(obj.specialist, "specialist");
  const type = parseType(obj.type);

  const base = {
    description,
    date,
    specialist,
    type,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    diagnosisCodes: obj.diagnosisCodes,
  };

  switch (obj.type) {
    case EntryType.HealthCheck:
      const healthCheckRating = parseHealthRating(obj.healthCheckRating);
      return { healthCheckRating, ...base, type: EntryType.HealthCheck };
    case EntryType.Hospital:
      const discharge = parseDischargeInfo(obj.discharge);
      return { discharge, ...base, type: EntryType.Hospital };
    case EntryType.OccupationalHealthcare:
      const employerName = parseTextField(obj.employerName, "employer name");
      return {
        employerName,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        sickLeave: obj.sickLeave,
        ...base,
        type: EntryType.OccupationalHealthcare,
      };
    default:
      throw new Error(`Unhandled type`);
  }
};

export default { toNewPatientEntry, toNewMedEntry };
