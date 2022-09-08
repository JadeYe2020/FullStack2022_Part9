import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient, Gender, Entry, EntryFormValues } from "../types";
import { apiBaseUrl } from "../constants";
import EntryDetails from "../components/EntryDetails";
import AddEntryForm from "../components/AddEntryForm";
import { Female, Male } from "@mui/icons-material";
import { Button, Stack, Paper } from "@mui/material";
import { Alert } from "@material-ui/lab";

const PatientInfoPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const [formOpened, setFormOpened] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
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
  }, [dispatch, patients]);

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
      <Stack spacing={2}>
        {entries.map((e) => (
          <Paper key={e.id} elevation={3} sx={{ padding: 1 }}>
            <EntryDetails entry={e} diagnoses={diagnoses} />
          </Paper>
        ))}
      </Stack>
    );
  };

  const GenderSymbol = ({ gender }: { gender: Gender }) => {
    switch (gender) {
      case "female":
        return <Female />;
      case "male":
        return <Male />;
      default:
        return null;
    }
  };

  const onSubmit = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({
        type: "ADD_ENTRY",
        payload: { patient, entry: newEntry },
      });
      setFormOpened(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const onCancel = () => {
    setFormOpened(false);
    setError(undefined);
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
      <br />
      <Button
        onClick={() => setFormOpened(true)}
        variant="contained"
        color="primary"
      >
        add new entry
      </Button>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      {formOpened ? (
        <AddEntryForm onSubmit={onSubmit} onCancel={onCancel} />
      ) : null}
    </div>
  );
};

export default PatientInfoPage;
