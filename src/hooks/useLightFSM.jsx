import { useState, useEffect, useRef } from 'react';

export default function useLightFSM(states, initialState, initiallyPaused = true) {
  const [currentState, setCurrentState] = useState(initialState);
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil((states[initialState].duration) / 1000));

  const [paused, setPaused] = useState(initiallyPaused);

  const countdownRef = useRef(states[initialState].duration); // Actual remaining clock time
  const requestRef = useRef(null); // For Animation Frame
  const lastTimestampRef = useRef(null); // Record timestamp from previous tick

  const tick = (timestamp) => {
    if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;

    const deltaTime = timestamp - lastTimestampRef.current; // elapsed time from previous tick
    lastTimestampRef.current = timestamp;

    if (!paused) {
      countdownRef.current -= deltaTime

      if (countdownRef.current < 0) {
        transitionTo(states[currentState].next)
      }

      updateCounter(countdownRef.current)
    }

    requestRef.current = requestAnimationFrame(tick);
  }

  const updateCounter = (countdown) => {
    const newSeconds = Math.ceil(countdown / 1000);
    if (newSeconds !== secondsLeft) {
      setSecondsLeft(newSeconds); 
    }
  }

  const transitionTo = (next) => {
    const nextState = next
    setCurrentState(nextState)
    countdownRef.current = states[nextState].duration
  }

  useEffect(()=>{
      if (!paused) {
        requestRef.current = requestAnimationFrame(tick);
      } else {
        lastTimestampRef.current = null;
      }
  
      return () => cancelAnimationFrame(requestRef.current);
    },[currentState, paused])

  const togglePlayPause = () => setPaused(prev => !prev);

  const handleReset = () => { // Back to initial state
    setPaused(true);
    transitionTo(initialState)
    updateCounter(countdownRef.current)
  }

  return {
    current: currentState,
    secondsLeft,
    paused,
    togglePlayPause,
    reset: handleReset,
  };
}
