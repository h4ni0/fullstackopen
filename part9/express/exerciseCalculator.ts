interface ResultObject  {
    periodLength: number;
    trainingDays: number;
    success : boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (days: Array<number>, target: number): ResultObject => {
    const result = days.reduce((a, b) => a + b) / days.length
    const rating = result >= target ? 3 : result == 0 ? 1 : 2
    return {
        periodLength: days.length,
        trainingDays: days.filter(i => i > 0).length,
        success : result > target,
        rating,
        ratingDescription: rating === 3 ? "Very good, keep going!" : rating === 2 ? "Good, but it could be better." : "Bad, try the next time.",
        target,
        average: result
    }
}


export default calculateExercises