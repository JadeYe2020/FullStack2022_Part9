import express from "express";
const app = express();

app.use(express.json());

import qs from "qs";
app.set("query parser", (str: string) =>
  qs.parse(str, {
    ignoreQueryPrefix: true,
  })
);

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.post("/", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({
      error: "parameters missing",
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (isNaN(target) || !Array.isArray(daily_exercises) || daily_exercises.find((h) => isNaN(h))
  ) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.json(calculateExercises(daily_exercises, target));
});

app.get("/bmi", (req, res) => {
  if (req.query.weight && req.query.height) {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    if (!isNaN(weight) && !isNaN(height) && height > 0) {
      const bmi = calculateBmi(height, weight);
      res.json({ ...req.query, bmi });
    } else {
      res.status(400).json({ error: "malformatted parameters" });
    }
  } else {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
