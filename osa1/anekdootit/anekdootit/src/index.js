import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = ({text, points}) => {
  return (
    <div>    
      <div>
        {text}
      </div>
      <div>
        has {points||0} votes
      </div>
    </div>    
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, addPoints] = useState({})
  const [topPost, setTopPost] = useState(0)

  const handleNextClick = () => {
    setSelected(Math.round(Math.random()*anecdotes.length)-1)
  }

  const handleUpVoteClick = () => {
    const selectedPoints = points[selected]||0

    addPoints({...points, [selected]:selectedPoints+ 1})

    if (selectedPoints + 1 > points[topPost] || !points[topPost])  {
      setTopPost(selected)
    }
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={props.anecdotes[selected]} points={points[selected]}/>
      <Button onClick={handleNextClick} text='next anectode' />
      <Button onClick={handleUpVoteClick} text='vote' />
      <h1>Anecdote with most votes</h1>
      <Anecdote text={props.anecdotes[topPost]} points={points[topPost]}/>    
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)