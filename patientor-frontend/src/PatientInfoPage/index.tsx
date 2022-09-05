import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { Female, Male } from "@mui/icons-material";

const PatientInfoPage = () => {
  const [{ patients }, dispatch] = useStateValue();
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

  if (!patient) {
    return <div>patient not found</div>;
  }

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
        {patient.name} {patient.gender} <GenderSymbol gender={patient.gender} />
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientInfoPage;
