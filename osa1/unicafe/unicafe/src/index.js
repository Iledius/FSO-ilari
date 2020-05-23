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
  if(good+neutral+bad===0)
  return(
    <div>
      <p> No feedback given </p>
    </div>
  )
  return(
    
    <table> 
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{good+neutral+bad}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{(good-bad)/(good+neutral+bad)}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{(good/(good+neutral+bad))*100} %</td>
        </tr>
      </tbody>
    </table>
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