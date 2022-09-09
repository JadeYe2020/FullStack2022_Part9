import { useStateValue } from "../state";
import { EntryFormValues, HealthCheckRating } from "../types";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { Field, Formik, Form, FieldProps } from "formik";
import { Select, MenuItem, InputLabel, Grid, Button } from "@material-ui/core";

type TypeOption = {
  value: "HealthCheck" | "Hospital" | "OccupationalHealthcare";
  label: string;
};

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
];

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
  options: HealthRatingOption[] | TypeOption[];
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
        } else if (
          !Date.parse(values.date) ||
          !/^[0-9]{4}(-[0-9]{1,2}){2}$/i.test(values.date)
        ) {
          errors.date = "Date is incorrectly formatted";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === "OccupationalHealthcare" && !values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Entry Type" name="type" options={typeOptions} />
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
            {values.type === "HealthCheck" && (
              <SelectField
                label="Healthcheck Rating"
                name="healthCheckRating"
                options={ratingOptions}
              />
            )}
            {values.type === "Hospital" && (
              <>
                <h4>Discharge info</h4>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                  validate={(value: string) => {
                    let error;
                    if (!value) {
                      error = "Discharge Date is required";
                    } else if (
                      !Date.parse(value) ||
                      !/^[0-9]{4}(-[0-9]{1,2}){2}$/i.test(value)
                    ) {
                      error = "Discharge Date is formatted incorrectly";
                    }
                    return error;
                  }}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Discharge Criteria"
                  name="discharge.criteria"
                  component={TextField}
                  validate={(value: string) => {
                    let error;
                    if (!value) {
                      error = "Discharge Criteria is required";
                    }
                    return error;
                  }}
                />
              </>
            )}
            {values.type === "OccupationalHealthcare" && (
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <h4>Sick leave info</h4>
                <Field
                  label="Start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                  validate={(value: string) => {
                    let error;
                    if (
                      value &&
                      (!Date.parse(value) ||
                        !/^[0-9]{4}(-[0-9]{1,2}){2}$/i.test(value))
                    ) {
                      error = "Start Date is formatted incorrectly";
                    }
                    if (!value && values.sickLeave?.endDate) {
                      error = "Please fill out both start and end dates";
                    }
                    return error;
                  }}
                />
                <Field
                  label="End date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                  validate={(value: string) => {
                    let error;
                    if (
                      value &&
                      (!Date.parse(value) ||
                        !/^[0-9]{4}(-[0-9]{1,2}){2}$/i.test(value))
                    ) {
                      error = "End Date is formatted incorrectly";
                    }
                    if (!value && values.sickLeave?.startDate) {
                      error = "Please fill out both start and end dates";
                    }
                    return error;
                  }}
                />
              </>
            )}
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
