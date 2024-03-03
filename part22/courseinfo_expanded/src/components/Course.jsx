
const Header = ({name}) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>{name} {exercises}</p>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(note => 
          <Part name={note.name} exercises={note.exercises} key={note.id}/>
        )}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const numberOfExercises = parts.reduce((sum, part) => sum+part.exercises, 0)
  
    return (
      <h3>total of {numberOfExercises} exercises</h3>
    )
  }
  
  const Course = ({course}) => {
    console.log(course)
    return (
      <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
  
  }
  
export default Course