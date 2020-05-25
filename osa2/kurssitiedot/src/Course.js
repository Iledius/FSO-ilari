import React from 'react';

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

  export default Course