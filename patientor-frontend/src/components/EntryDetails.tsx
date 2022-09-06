import React from "react";
import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";

const HealthCheckEntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: { [code: string]: Diagnosis };
}) => {
  return (
    <div className="Entry">
      <div>
        {entry.date} {entry.type}
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
      <div>{entry.healthCheckRating}</div>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((d) => (
            <li key={d}>
              {d} {diagnoses[d].name}
            </li>
          ))}
        </ul>
      ) : null}
      <div>diganosed by {entry.specialist}</div>
    </div>
  );
};

const HospitalEntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: { [code: string]: Diagnosis };
}) => {
  return (
    <div className="Entry">
      <div>
        {entry.date} {entry.type}
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
      <div>
        discharged on {entry.discharge.date} ({entry.discharge.criteria})
      </div>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((d) => (
            <li key={d}>
              {d} {diagnoses[d].name}
            </li>
          ))}
        </ul>
      ) : null}
      <div>diganosed by {entry.specialist}</div>
    </div>
  );
};

const OccupationalHealthcareEntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: { [code: string]: Diagnosis };
}) => {
  return (
    <div className="Entry">
      <div>
        {entry.date} {entry.type} {entry.employerName}
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
      {entry.sickLeave ? (
        <div>
          sick leave: from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </div>
      ) : null}
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((d) => (
            <li key={d}>
              {d} {diagnoses[d].name}
            </li>
          ))}
        </ul>
      ) : null}
      <div>diganosed by {entry.specialist}</div>
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: { [code: string]: Diagnosis };
}) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryDetails
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
