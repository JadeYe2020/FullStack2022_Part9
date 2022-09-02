// interface TargetAndHours {
//   target: number;
//   hours: Array<number>;
// }

// const parseArgsToTargetAndHours = (args: Array<string>): TargetAndHours => {
//   if (args.length < 4) throw new Error("Not enough arguments");
//   const argsForCal = args.slice(2);
//   if (argsForCal.every((a) => !isNaN(Number(a)))) {
//     const hours = argsForCal.slice(1).map((a) => Number(a));
//     if (hours.find((h) => h < 0)) {
//       throw new Error("Values cannot be negative.");
//     }

//     return {
//       target: Number(argsForCal[0]),
//       hours,
//     };
//   } else {
//     throw new Error("Provided values were not numbers!");
//   }
// };

type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  hours: Array<number>,
  target: number
): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((h) => h > 0).length;
  const totalHours = hours.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
  const average = totalHours / periodLength;

  let rating: Rating;
  if (average - target > 0) {
    rating = 3;
  } else if (average - target < -0.5) {
    rating = 1;
  } else {
    rating = 2;
  }

  let ratingDescription = "";
  let success = false;
  switch (rating) {
    case 1:
      ratingDescription = "bad";
      success = false;
      break;
    case 3:
      ratingDescription = "keep up the good work!";
      success = true;
      break;
    default:
      ratingDescription = "not too bad but could be better";
      success = false;
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// try {
//   const { target, hours } = parseArgsToTargetAndHours(process.argv);
//   console.log(calculateExercises(hours, target));
// } catch (error: unknown) {
//   let errMsg = "some error happened";
//   if (error instanceof Error) {
//     errMsg += " Error: " + error.message;
//   }
//   console.log(errMsg);
// }
