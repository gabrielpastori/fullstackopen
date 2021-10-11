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

const Anecdote = ({text,votes}) => {
  return (
    <div>
      <p>{text}</p>
      <div>has {votes} votes</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const numberPhrases = anecdotes.length

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(numberPhrases).fill(0))

  const getRandom = (min,max) => Math.floor(Math.random() * (max-min) + min)
  const handleNext = () => setSelected(getRandom(0,numberPhrases))
  const handleVote = () => {
    const copy = [...points]
    copy[selected]+=1
    return (
      setPoints(copy)
    )
  }
  const getMostVoted = () => {
    let max = 0
    let maxIdx = 0
    for(let i=0; i<numberPhrases; i++){
      if(points[i]>max){
        max=points[i]
        maxIdx=i
      }
    }
    return maxIdx
  } 

  const mostVoted = getMostVoted()

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Anecdote text={anecdotes[selected]} votes = {points[selected]}/>
      <Button onClick={handleVote} text="vote"/>
      <Button onClick={handleNext} text="next anecdote"/>

      <Header text="Anecdote with the most votes"/>
      <Anecdote text={anecdotes[mostVoted]} votes = {points[mostVoted]}/>
    </div>
  )
}

export default App

