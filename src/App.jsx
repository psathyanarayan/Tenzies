import React from "react"
import "/src/App.css"
import Dice from "/src/components/Digit.jsx"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


export default function App() {
  const [diesState,setDiesState] = React.useState(allNewDies())
  const [tenzies, setTenzies] = React.useState(false)
  const [maxRolls,setMaxRolls] = React.useState(localStorage.getItem("maxRolls"))
  const [rolls,setRolls] = React.useState(0)


    
    React.useEffect(() => {
      if(diesState.every(die=>die.isHeld === true) && diesState.every(die=>die.value === diesState[0].value)){
        setTenzies(true)
        if(maxRolls > rolls){
          setMaxRolls(rolls)
        }
        localStorage.setItem("maxRolls",maxRolls)
        setRolls(0)


      }
    }, [diesState])
  function allNewDies(){
    //Random number from 1 to 6
    const newDies = []
    for (let i = 0; i < 10; i++) {
      newDies.push({
        value:Math.ceil(Math.random() * 6) + 1,
        isHeld:false,
        id:nanoid()
      })
    }
    return newDies
  }
  function rollDies(){

    setDiesState(prevState => prevState.map(die => {
      return die.isHeld ? die : {...die,value:Math.ceil(Math.random() * 6) + 1}
    })
    )
    
    setRolls(prevState => prevState + 1)
    if(localStorage.getItem("maxRolls") === null){
      setMaxRolls(rolls)
    }
    
  }
  function holdDice(id){
      setDiesState(prevState => prevState.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      }))}
    
  function resetRollDies(){
    setDiesState(allNewDies())
    setTenzies(false) 
}
  const dieElement =  diesState.map((die) => {
  
    return <Dice onClick={()=>holdDice(die.id)} key={die.id} digit={die.value} isHeld={die.isHeld} />
  })
  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="heading">Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="digit-section">
        {dieElement}
      </div>
      {tenzies === true ?(<button onClick={resetRollDies}>Reset</button>):(<button onClick={rollDies}>Roll</button>)}
      <p className="score">Best Score: {maxRolls}</p>
      <p className="note">lower the score better</p>
    </main>
  )
  }