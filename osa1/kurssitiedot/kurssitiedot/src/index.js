import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <div>
        <h1>{props.title}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
        <p>{props.name} {props.ex}</p>
    </div>
  )
}

const Content = (details) => {
  return (
    <div>
      <Part name={details.name1} ex = {details.ex1}/>
      <Part name={details.name2} ex = {details.ex2}/>
      <Part name={details.name3} ex = {details.ex3}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
        <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header title={course}/>
      <Content name1={part1.name} ex1={part1.exercises}
                name2={part2.name} ex2={part2.exercises}
                name3={part3.name} ex3={part3.exercises} /> 

      <Total ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))