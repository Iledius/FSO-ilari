import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Header = ({title}) => {
  return(
  <h1>
    {title}
  </h1>
  )
}
const Stats = ({ good, bad, neutral }) => {
  return(
    <div>
      <p> good {good} </p>
      <p> neutral {neutral} </p>
      <p> bad {bad} </p>
      <p> all {good+neutral+bad}</p>
      <p> average {(good-bad)/(good+neutral+bad)}</p>
      <p> positive {good/(good+neutral+bad)}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {setGood(good + 1)}

  const handleNeutralClick = () => {setNeutral(neutral + 1)}

  const handleBadClick = () => {setBad(bad + 1)}

  return (
    <div>
      <Header title={"give feedback"}/>
      <Button onClick={handleGoodClick} text='Good' />
      <Button onClick={handleNeutralClick} text='Neutral' />
      <Button onClick={handleBadClick} text='Bad' />
      <Header title={"statistics"}/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)