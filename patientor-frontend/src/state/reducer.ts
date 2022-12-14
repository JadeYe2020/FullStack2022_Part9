import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: { patient: Patient; entry: Entry };
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patient.id]: {
            ...action.payload.patient,
            entries: [...action.payload.patient.entries, action.payload.entry],
          },
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        diagnoses: {
          ...action.payload.reduce(
            (prev, diagnose) => ({ ...prev, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    default:
      return state;
  }
};
