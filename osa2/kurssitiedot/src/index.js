import React from 'react';
import ReactDOM from 'react-dom';

const Header = ( course ) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ( {course} ) => {

  const total = course.parts.reduce((acc, part) => 
  {return(acc + part.exercises)
  },0)

  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
  
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>    
  )
}

const Course = ({ course }) => {
  return(
    <div>
      <div>
        <Header name={course.name}/>
      </div>
      {course.parts.map((part) =>
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
      <div>
        <Total course = {course}/>
      </div>
    </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(  
    <div>
      <div>
        <h1>Web development curriculum</h1>
      </div>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))