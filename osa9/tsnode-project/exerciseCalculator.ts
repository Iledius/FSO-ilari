export interface ExcerciseRating {
  periodLength: number;
  trainingDays: number;
  success: Boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exercise: Array<number>,
  target: number
): ExcerciseRating => {
  const totalDays = exercise.length;
  const trainingDays = exercise.filter((e) => e).length;
  const success = exercise.filter((e) => e > target).length / totalDays === 1;

  enum rating {
    'bad',
    'decent',
    'good',
  }

  return {
    periodLength: totalDays,
    trainingDays: trainingDays,
    success: success,
    rating: Math.floor(trainingDays / totalDays) * 3,
    ratingDescription: rating[Math.floor(trainingDays / totalDays) * 3], // 3 = good, 2 = decent, 1 = bad
    target: target,
    average: exercise.reduce((a, b) => a + b, 0) / exercise.length,
  };
};

export default calculateExercises;
