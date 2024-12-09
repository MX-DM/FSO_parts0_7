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
      <Header course= {course}/>
      <Content course={course}/>
      <Total course= {course}/>
    </div>
  )
}

const Header = (props) => {
  return (
  <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.course.parts[0].name} exer={props.course.parts[0].exercises} />
      <Part part={props.course.parts[1].name} exer={props.course.parts[1].exercises} />
      <Part part={props.course.parts[2].name} exer={props.course.parts[2].exercises} />
    </div>
  );
};

const Part = (props) => {
  return (
  <p>{props.part} {props.exer}</p>
  )
}

const Total = (props) => {
  let exertotal
  for (let i = 0; i < props.course.parts.length; i++) {
    exertotal =+ props.course.parts[i].exercises
  }
  return (
  <p>Number of exercises: {exertotal}</p>
  )
}

export default App
