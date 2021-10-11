import React, { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({text,onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const ResultLine = (props) => {
  if (props.percent){
    return (
      <p>{props.text} {props.value} %</p>
    )
  }
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = ({good,neutral,bad}) => {
  const total = good+neutral+bad
  const average = (good-bad)/total
  const positive = (good/total*100)
  return (
    <div>
      <ResultLine text="good" value={good}/>
      <ResultLine text="neutral" value={neutral}/>
      <ResultLine text="bad" value={bad}/>
      <ResultLine text="all" value={total}/>
      <ResultLine text="average" value={average}/>
      <ResultLine text="positive" value={positive} percent={true}/>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const goodPlusOne = () => setGood(good+1)
  const neutralPlusOne = () => setNeutral(neutral+1)
  const badPlusOne = () => setBad(bad+1)

  return (
    <div>
      <Header text="give feedback"/>
      <Button text="good" onClick={goodPlusOne}/>
      <Button text="neutral" onClick={neutralPlusOne}/>
      <Button text="bad" onClick={badPlusOne}/>
      <Header text="statistics"/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
