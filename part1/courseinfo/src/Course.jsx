const Course = ({course}) => {
    return (
    <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  
  const Header = ({course}) => {
    return (
    <h1>{course.name}</h1>
    )
  }
  
  const Content = ({ course: { parts } }) => {
    return (
      <div>
        {parts.map(p => <Part key={p.id} part={p.name} exer={p.exercises}/>)}
      </div>
    );
  };
  
  const Part = ({part, exer}) => {
    return (
    <p>{part} {exer}</p>
    )
  }
  
  const Total = ({ course: { parts } }) => {
    const exertotal = parts.reduce((sum, p) => sum + p.exercises, 0)
    return (
    <p>Total of exercises: {exertotal}</p>
    )
  }

export default Course