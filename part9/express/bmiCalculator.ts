const calculateBmi = (height: number, weight: number) => {
    try {
        const result = weight / (height/100)**2
        if (result >= 40) return "Obese (Class III)"
        if (result > 35) return "Obese (Class II)"
        if (result > 30) return "Obese (Class I)"
        if (result > 25) return "Overweight (Pre-obese)"
        if (result > 18) return "Normal range"
        if (result > 17) return "Obese (Class I)"
        if (result > 16) return "Obese (Class II)"
        if (result < 16) return "Obese (Class III)"
    } catch (err) {
        return err
    }
}

export default calculateBmi