const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const courses = [
    {name: part1, exer: exercises1},
    {name: part2, exer: exercises2},
    {name: part3, exer: exercises3}
  ]

  return (
    <div>
      <Header course= {course}/>
      <Content courses={courses}/>
      <Total exertotal= {exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

const Header = (props) => {
  return (
  <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.courses[0].name} exer={props.courses[0].exer} />
      <Part part={props.courses[1].name} exer={props.courses[1].exer} />
      <Part part={props.courses[2].name} exer={props.courses[2].exer} />
    </div>
  );
};

const Part = (props) => {
  return (
  <p>{props.part} {props.exer}</p>
  )
}

const Total = (props) => {
  return (
  <p>Number of exercises: {props.exertotal}</p>
  )
}
export default App
