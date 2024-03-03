
const Header = ({course, _}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercise}</p>
    </>

  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  const numberOfExercises = props.parts.map(part => part.exercises)
  console.log(numberOfExercises)

  return (
    <div>
      <p>Number of exercises {numberOfExercises[0] + numberOfExercises[1] + numberOfExercises[2]}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App