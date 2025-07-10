interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    const height = Number(args[2]);
    const weight = Number(args[3]);
  
    if (isNaN(height) || isNaN(weight)) {
      throw new Error('Provided values were not numbers!');
    }
  
    if (height <= 0 || weight <= 0) {
      throw new Error("Provided values aren't suitable!");
    }
  
    return { height, weight };
};
  

const calculateBmi = (height: number, weight: number) : string => {
    const result = weight / ((height/100)**2)
    if (result < 18.5) return 'Underweight';
    else if (result < 25) return 'Normal range';
    else if (result < 30) return 'Overweight';
    else return 'Obese';
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}