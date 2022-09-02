interface TwoNumberValues {
  v1: number;
  v2: number;
}

const parseArguments = (args: Array<string>): TwoNumberValues => {
  if (args.length != 4) throw new Error("Needs 2 arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      v1: Number(args[2]),
      v2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) {
    throw new Error("Height cannot be zero.");
  }
  if (height < 0 || weight < 0) {
    throw new Error("Values cannot be negative.");
  }
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

try {
  const { v1, v2 } = parseArguments(process.argv);
  console.log(calculateBmi(v1, v2));
} catch (error: unknown) {
  let errMsg = "some error happened";
  if (error instanceof Error) {
    errMsg += " Error: " + error.message;
  }
  console.log(errMsg);
}
