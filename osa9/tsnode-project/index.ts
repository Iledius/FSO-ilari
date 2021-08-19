/* eslint-disable no-console */
import express from 'express';
import calculateBMI from './bmiCalculator';
import calculateExercises, { ExcerciseRating } from './exerciseCalculator';

const app = express();
app.use(express.json());

interface BMI {
  weight: number;
  height: number;
  bmi: string;
}

app.post('/bmi', (req: any, res: any) => {
  try {
    const weight: number = Number(req.query.weight);
    const height: number = Number(req.query.height);
    const bmi: string = calculateBMI(weight, height);

    if (!weight || !height || !bmi) {
      const errorMsg = 'malformatted input!';
      throw errorMsg;
    }

    const bmiData: BMI = {
      weight,
      height,
      bmi,
    };

    res.send(bmiData);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

app.post('/exercise', (req: any, res: any) => {
  try {
    console.log(req.body);

    const exercises: Array<number> = req.query.daily_exercises;
    const target: number = Number(req.query.target);

    if (!exercises || !target) {
      const errorMsg = 'malformatted input!';
      throw errorMsg;
    }

    const exerciseResult: ExcerciseRating = calculateExercises(
      exercises,
      target
    );
    res.send(exerciseResult);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
