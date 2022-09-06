import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient, Gender, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import EntryDetails from "../components/EntryDetails";
import { Female, Male } from "@mui/icons-material";
import { Button } from "@material-ui/core";

const PatientInfoPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const id = useParams().id as string;

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const patientFound: Patient = await axios.get(
          `${apiBaseUrl}/patients/${id}`
        );
        if (patientFound) {
          dispatch({ type: "ADD_PATIENT", payload: patientFound });
        } else {
          return null;
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (Object.keys(patients).includes(id)) {
      setPatient(patients[id]);
    } else {
      void fetchPatient(id);
    }
  }, [dispatch]);

  // return null if the id cannot be found
  if (!patient) {
    return <div>patient not found</div>;
  }

  const Entries = ({ entries }: { entries: Entry[] }) => {
    // don't show the component if there is no entries
    if (!entries.length) {
      return null;
    }

    return (
      <div>
        {entries.map((e) => (
          <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />
        ))}
      </div>
    );
  };

  const GenderSymbol = ({ gender }: { gender: Gender }) => {
    switch (gender) {
      case "female":
        return <Female />;
        break;
      case "male":
        return <Male />;
        break;
      default:
        return null;
        break;
    }
  };

  return (
    <div>
      <h2>
        {patient.name} <GenderSymbol gender={patient.gender} />
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      <Entries entries={patient.entries} />
      <Button variant="contained" color="primary">
        add new entry
      </Button>
    </div>
  );
};

export default PatientInfoPage;
