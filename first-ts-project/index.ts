import express from "express";
const app = express();

import qs from "qs";
app.set("query parser", (str: string) =>
  qs.parse(str, {
    ignoreQueryPrefix: true,
  })
);

import { calculateBmi } from "./bmiCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
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
