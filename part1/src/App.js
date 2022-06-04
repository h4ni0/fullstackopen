const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <>
      <h1>{props.data}</h1>
      <p>{props.exer}</p>
    </>
  );
}

const Content = (props) => {
  return (
    <div>
      <Part data={props.data[0]} exer={props.exer[0]} />
      <Part data={props.data[1]} exer={props.exer[1]} />
      <Part data={props.data[2]} exer={props.exer[2]} />
    </div>
  )
}

const Total = (props) => {
  return <p>Numbers of exercises {props.num}</p>
}

const App = () => {
   const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content data={[part1, part2, part3]} exer={[exercises1 , exercises2 , exercises3]} />
      <Total num={exercises1 + exercises2 + exercises3} />
    </div>
  )
}
const App2 = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

export default App