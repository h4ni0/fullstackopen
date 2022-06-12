const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <h3>total of {sum} exercises</h3>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => <>{parts.map(part => <Part key={part.id} part={part} />)}</>
  

const Course = ({ course }) => {
     return <div>
              <Header course={course.name} />
              <Content parts={course.parts} />
              <Total sum={course.parts.map(part => part.exercises).reduce((total, i) => total + i, 0)} />
            </div>
}

export default Course