const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) / (height / 100);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi > 29.9) {
    return "Obese";
  } else if (bmi > 24.9) {
    return "Overweight";
  } else {
    return "Normal (healthy weight)";
  }
};

console.log(calculateBmi(180, 74));
