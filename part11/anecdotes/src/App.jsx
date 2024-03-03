import { useState, useTransition } from 'react'

const Button = ({text, onClick}) => {   
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

const Anecdote = ( {title, text, votes} ) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{text} : {votes}</p>
    </div>
  )
}

const AnecdoteMostVoted = ( { anecdotes, votes }) => {
  function arrayMaxIndex(array) {
    return array.indexOf(Math.max.apply(null, array));
  }
  const mostVotedAnecdoteIndex = arrayMaxIndex(votes)
  console.log(mostVotedAnecdoteIndex)
  return (
    <Anecdote title={'Anecdote with most votes'} text={anecdotes[mostVotedAnecdoteIndex]} votes={votes[mostVotedAnecdoteIndex]}/>
    )
  

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleNextAnecdote = () => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    const nextIndex = getRandomInt(anecdotes.length)
    if(nextIndex == selected) {
      handleNextAnecdote()
    }
    setSelected(nextIndex)
  }

  const handleVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  return (
    <div>
      <></>
      <Anecdote title={'Anecdote of the day'} text={anecdotes[selected]} votes={votes[selected]}/>
      <Button text={'vote'} onClick={handleVote}/>
      <Button text={'next anecdote'} onClick={handleNextAnecdote}/>
      <AnecdoteMostVoted anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App