export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NewPatienEntry = Omit<PatientEntry, "id">;

export type Patient = Omit<PatientEntry, "ssn">;

export enum Gender {
  M = "male",
  F = "female",
  Other = "other",
}
