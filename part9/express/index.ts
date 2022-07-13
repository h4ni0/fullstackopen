import express from 'express'
import calculateBmi from './bmiCalculator'
import calculateExercises from './exerciseCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})


app.get('/bmi', (req, res) => {
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)
    
    if (!height || !weight) return res.json({error: "malformatted parameters"})

    return res.json({
        height,
        weight,
        bmi: calculateBmi(height, weight)
    })
})

app.post('/exercises', (req, res) => {
    const {daily_exercises, target} = req.body
    if(!daily_exercises || !target) return res.json({error: "parameters missing"})
    return res.json(calculateExercises(daily_exercises.map((n: any) => Number(n)), Number(target)))
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})