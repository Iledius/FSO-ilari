const calculateBMI = (weight: number, height: number): string => {
  const bmi = (weight / (height * height)) * 10000;

  switch (true) {
    case bmi < 18.5:
      return 'underweight';
    case bmi >= 18.5 && bmi <= 25:
      return 'healthy weight';
    case bmi > 25 && bmi <= 30:
      return 'overweight';
    case bmi > 30:
      return 'obese';
    default:
      return 'error';
  }
};

export default calculateBMI;
