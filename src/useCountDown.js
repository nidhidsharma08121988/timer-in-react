import { useState, useEffect } from 'react'

const countTimeInMs = (minutes, seconds) => minutes * 60 * 1000 + seconds * 1000

const useCountDown = timeOutFn => {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timerID, setTimerID] = useState(0)
  const [timeInMS, setTimeInMS] = useState(0)

  const clearCountDown = () => {
    clearInterval(timerID)
    setMinute(0)
    setSecond(0)
  }

  useEffect(() => {
    setTimeInMS(countTimeInMs(minutes, seconds))
  }, [minutes, seconds])

  const setMinute = newMin => {
    setMinutes(newMin)
  }
  const setSecond = newSec => {
    setSeconds(newSec)
  }

  const startCountDown = () => {
    if (!timerID && (minutes > 0 || seconds > 0)) {
      const id = setInterval(displayMinutesAndSeconds, 1000)
      setTimerID(id)
    }
    console.log(timerID)

    setTimeout(() => {
      clearCountDown()
      timeOutFn()
    }, timeInMS)
  }

  let counter = 0
  const displayMinutesAndSeconds = () => {
    counter = counter + 1
    const newMs = timeInMS - 1000 * counter
    if (newMs > 0) {
      const newMin = Math.floor(newMs / 1000 / 60)
      const newSec = Math.floor((newMs / 1000) % 60)

      setMinute(newMin)
      setSecond(newSec)
    } else {
      clearInterval(timerID)
      setMinute(0)
      setSecond(0)
    }
  }

  return [minutes, setMinute, seconds, setSecond, startCountDown, timerID]
}

export default useCountDown
