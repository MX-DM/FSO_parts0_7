
interface ExerciseValues {
  target: number;
  exercices: number[];
}

const parseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
  
    const target = Number(args[2]);
    const exercices = JSON.parse(args[3]);
    
    if(isNaN(target)) {throw new Error('The target isn\'t a number!');}
    if(target <= 0) {throw new Error('The target must be a positive number!');}
    if (!Array.isArray(exercices) || !exercices.every(n => typeof n === 'number')) {
        throw new Error('Exercise hours must be an array of numbers!');
    }
    
    return { target, exercices };
};

interface Result {
    netDays: number;
    trainingDays: number;
    target: number;
    average: number;
    reached: boolean;
    rating: number;
    ratingDescription: string;
}

const calculateExercises = (exercices: number[], target: number): Result => {
    const netDays = exercices.length;
    const trainingDays = (exercices.filter(e => e > 0)).length;
    const average = exercices.reduce((sum, num) => sum + num, 0) / exercices.length;
    const reached = average >= target;
    let rating: number;
    let ratingDescription: string;
    if (average >= target) {
        rating = 3;
        ratingDescription = 'Great job, you reached your goal!';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'You need to push harder!';
    }

    return {
        netDays,
        trainingDays,
        average,
        target,
        reached,
        rating,
        ratingDescription
    }
}

try {
    const { target, exercices } = parseArguments(process.argv)
    console.log(calculateExercises(exercices, target))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export {};