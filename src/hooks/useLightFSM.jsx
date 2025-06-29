import { useState, useEffect, useRef } from 'react';

export default function useLightFSM(states, initialState, initiallyPaused = true) {
  const [currentState, setCurrentState] = useState(initialState);
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil((states[initialState].duration - 10) / 1000));

  const [paused, setPaused] = useState(initiallyPaused);

  const countdownRef = useRef(states[initialState].duration - 10);
  const requestRef = useRef(null);
  const lastTimestampRef = useRef(null);

  const tick = (timestamp) => {
    if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;

    const deltaTime = timestamp - lastTimestampRef.current;
    lastTimestampRef.current = timestamp;

    if (!paused) {
      countdownRef.current -= deltaTime

      if (countdownRef.current < 0) {
        const nextState = states[currentState].next
        setCurrentState(nextState)
        countdownRef.current = states[nextState].duration
      }

      const newSeconds = Math.ceil(countdownRef.current / 1000);
      if (newSeconds !== secondsLeft) {
        setSecondsLeft(newSeconds);
      }
    }

    requestRef.current = requestAnimationFrame(tick);
  }

  useEffect(()=>{
      if (!paused) {
        lastTimestampRef.current = performance.now();
        requestRef.current = requestAnimationFrame(tick);
      }
  
      return () => cancelAnimationFrame(requestRef.current);
    },[currentState, paused])

  const togglePlayPause = () => setPaused(prev => !prev);

  const handleReset = () => {
    setPaused(initiallyPaused);
    setCurrentState(initialState);
    countdownRef.current = states[currentState].duration - 10;
    setSecondsLeft(Math.ceil(countdownRef.current / 1000));
  }

  return {
    current: currentState,
    secondsLeft,
    paused,
    togglePlayPause,
    reset: handleReset,
  };
}
