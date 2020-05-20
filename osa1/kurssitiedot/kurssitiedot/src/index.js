import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <div>
        <h1>{props.title}</h1>
    </div>
  )
}

const Content = (details) => {
  return (
    <div>
      <p>{details.name1} {details.ex1}</p>
      <p>{details.name2} {details.ex2}</p>
      <p>{details.name3} {details.ex3}</p>
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title={course}/>
      <Content name1={part1} ex1={exercises1}
                name2={part2} ex2={exercises2}
                name3={part3} ex3={exercises3} /> 

      <Total ex1={exercises1} ex2={exercises1} ex3={exercises1}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))