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

const calculateExercises = (hours: Array<number>, target: number): Result => {
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
      ratingDescription = "that's not enough";
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
