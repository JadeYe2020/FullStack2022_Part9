import express from "express";
import patientService from "../services/patientService";
import toNewPatienEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatienEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
