import { useStateValue } from "../state";
import { EntryFormValues, HealthCheckRating } from "../types";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import {
  // ErrorMessage,
  Field,
  Formik,
  Form,
  FieldProps,
  // FormikProps,
} from "formik";
import { Select, MenuItem, InputLabel, Grid, Button } from "@material-ui/core";

// type TypeOption = {
//   value: EntryType;
//   label: string;
// };

// const typeOptions: TypeOption[] = [
//   { value: EntryType.HealthCheck, label: "Health Check" },
//   { value: EntryType.Hospital, label: "Hospital" },
//   { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
// ];

type HealthRatingOption = {
  value: HealthCheckRating;
  label: string;
};

const ratingOptions: HealthRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "0 - Healthy" },
  { value: HealthCheckRating.LowRisk, label: "1 - Low risk" },
  { value: HealthCheckRating.HighRisk, label: "2 - Hight risk" },
  { value: HealthCheckRating.CriticalRisk, label: "3 - Critical risk" },
];

type SelectFieldProps = {
  name: string;
  label: string;
  options: HealthRatingOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => (
  <Select {...field} {...props} />
);
const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.Healthy,
        diagnosisCodes: undefined,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField
              label="Healthcheck Rating"
              name="healthCheckRating"
              options={ratingOptions}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
