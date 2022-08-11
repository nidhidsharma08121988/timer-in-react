import './App.css'

import { useState } from 'react'
import useCountDown from './useCountDown'

const timeOutFn = () => {
  console.log('Timer Expired')
}

function App() {
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [minutes, setMinutes, seconds, setSeconds, startCountDown, timerID] =
    useCountDown(timeOutFn)

  const clearCountDown = () => {
    clearInterval(timerID)
    setMinutes(0)
    setSeconds(0)
  }
  const startStopTimer = () => {
    if (!isTimerOn) {
      startCountDown()
    }
    if (isTimerOn) {
      clearCountDown()
    }
    setIsTimerOn(!isTimerOn)
  }
  return (
    <div>
      {!isTimerOn ? (
        <div>
          <input
            type='number'
            value={minutes}
            onChange={e => setMinutes(e.target.value)}
            min={0}
            max={15}
            maxLength={2}
          ></input>
          :
          <input
            type='number'
            value={seconds}
            onChange={e => setSeconds(e.target.value)}
            min={0}
            max={50}
            maxLength={2}
          ></input>
        </div>
      ) : (
        <div>
          <label>{minutes}</label>:<label>{seconds}</label>
        </div>
      )}
      <button onClick={startStopTimer}>
        {isTimerOn ? 'Reset/Stop Timer' : 'Start Timer'}
      </button>
    </div>
  )
}

export default App
