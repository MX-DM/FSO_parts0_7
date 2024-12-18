import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)


  const clickHandler = (setter) => {
    setter((prev) => prev + 1)
    setTotal((prev) => prev + 1)
  }

  const calculateAverage = () => {
    let total = good + neutral + bad
    if (total === 0) {
      return 'Not available'
    }
    let avg = (good - bad) / total
    return avg.toFixed(2)
  }

  const calculatePercentage = () => {
    let total = good + neutral + bad
    if (total === 0) {
      return 'Not available'
    }
    let per = 100*(good/total)
    return `${per.toFixed(2)} %`
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button clickHandler={() => clickHandler(setGood)} text={'Good'}/>
      <Button clickHandler={() => clickHandler(setNeutral)} text={'Neutral'}/>
      <Button clickHandler={() => clickHandler(setBad)} text={'Bad'}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={calculateAverage()} percentage={calculatePercentage()}/>
    </div>
  )
}

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <table>
    <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    </tbody>
    </table>
  )
}

const Statistics = ({good, neutral, bad, total, average, percentage}) => {
  if (total === 0) {
    return (
      <p>No Feedback</p>
    )
  }
  return (
    <>
    <StatisticLine text={'Good'} value={good}/>
    <StatisticLine text={'Neutral'} value={neutral}/>
    <StatisticLine text={'Bad'} value={bad}/>
    <StatisticLine text={'Total'} value={total}/>
    <StatisticLine text={'Average'} value={average}/>
    <StatisticLine text={'Positive'} value={percentage}/>
    </>
  )
}

export default App