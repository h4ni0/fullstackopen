import {useState} from 'react'

const DisplayText = ({text}) => {
  return <h1>{text}</h1>
}

const StatisticLine = ({text, num}) => {
  return <tr>
            <td>{text}</td>
            <td>{num}</td>
          </tr>
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad == 0) return <div>No feedback given</div>
  return (
    <table>
        <tbody>
          <StatisticLine text="good" num={good} />
          <StatisticLine text="neutral" num={neutral} />
          <StatisticLine text="bad" num={bad} />
          <StatisticLine text="all" num={good + neutral + bad} />
          <StatisticLine text="average" num={(good + (bad*-1)) / (good + neutral + bad)} />
          <StatisticLine text="positive" num={(100 * good/(good + bad + neutral)) + " %"} />
        </tbody>
    </table>
  )
}

const Button = ({text, call}) => {
  return <button onClick={call}>{text}</button>
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodReview = () => setGood(good + 1);
  const neutralReview = () => setNeutral(neutral + 1);
  const badReview = () => setBad(bad + 1);

  return (
    <div>
        <DisplayText text="give feedback" />
        <Button text="good" call={goodReview} />
        <Button text="neutral" call={neutralReview} />
        <Button text="bad" call={badReview} />
        <DisplayText text="statistics" />
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;