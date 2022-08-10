import { useState } from 'react'

const useCountDown = timeOutFn => {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timerID, setTimerID] = useState(0)
  const timeInMS = minutes * 60 * 1000 + seconds * 1000

  const clearCountDown = () => {
    clearInterval(timerID)
    setMinutes(0)
    setSeconds(0)
  }

  const setMinute = newMin => {
    setMinutes(newMin)
  }
  const setSecond = newSec => {
    setSeconds(newSec)
  }

  const startCountDown = () => {
    if (!timerID) {
      const id = setInterval(displayMinutesAndSeconds, 1000)
      setTimerID(id)
    }
  }

  setTimeout(() => {
    clearInterval(timerID)
    timeOutFn()
  }, timeInMS)

  let counter = 0
  const displayMinutesAndSeconds = () => {
    counter = counter + 1
    const newMs = timeInMS - 1000 * counter

    const newMin = Math.floor(newMs / 1000 / 60)
    const newSec = Math.floor((newMs / 1000) % 60)

    setMinutes(newMin)
    setSeconds(newSec)
  }

  return [
    minutes,
    setMinute,
    seconds,
    setSecond,
    startCountDown,
    clearCountDown,
  ]
}

export default useCountDown
