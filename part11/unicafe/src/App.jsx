import { useState } from 'react'

const Section = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )

}

const StastisticLine = ( {text, value, percentage} ) => {
  return (
    <tr>
      <td> {text} </td> 
      <td> {percentage ? `${value} %` : value} </td>
  </tr>
  )
}


const Statistics = ( { good, neutral, bad } ) => {
  const total = good + neutral + bad
  const score = good - bad
  const averageScore = score/total
  const positivePercentage = 100*good/total

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StastisticLine text={'good'} value={good}/>
        <StastisticLine text={'neutral'} value={neutral}/>
        <StastisticLine text={'bad'} value={bad}/>
        <StastisticLine text={'average'} value={averageScore}/>
        <StastisticLine text={'positive'} value={positivePercentage} percentage={true}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1)
  const handleNeutralClick = () => setNeutral(neutral+1)
  const handleBadClick = () => setBad(bad+1)


  return (
    <div>
      <Section text={'give feedback'}/>
      <Button onClick={handleGoodClick} text={'good'}/>
      <Button onClick={handleNeutralClick} text={'neutral'}/>
      <Button onClick={handleBadClick} text={'bad'}/>
      <Section text={'statistics'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App