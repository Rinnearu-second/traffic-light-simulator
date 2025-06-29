import React, { useState, useEffect } from 'react';
import TrafficLightStates from '../models/TrafficLightStates';
import useLightFSM from '../hooks/useLightFSM';

export default function TrafficLight() {
  // Use hook instead of putting the states and references in component
  const {
    current,
    secondsLeft,
    paused,
    togglePlayPause,
    reset
  } = useLightFSM(TrafficLightStates, 'red')

  const getColorStyle = (color) => ({
    width: 100,
    height: 100,
    borderRadius: '50%',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: current === color ? color : '#444',
    boxShadow: current === color ? `0 0 10px ${color}` : 'none',
    transition: 'all 0.3s ease',
  });

  return (
    <div style={{
      textAlign: 'center',
      padding: 40,
      borderRadius: 20,
      width: 300,
      margin: 'auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ marginBottom: 30 }}>Traffic Light Simulation</h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          backgroundColor: '#222',
          padding: 20,
          borderRadius: 20,
          display: 'inline-block'
        }}>
          <div style={getColorStyle('red')} />
          <div style={getColorStyle('yellow')} />
          <div style={getColorStyle('green')} />
        </div>

        <div style={{
          marginTop: 20,
          fontSize: 40,
          fontWeight: 'bold',
          borderRadius: 15,
          display: 'inline-block'
        }}>
          {secondsLeft}s
        </div>
      </div>

      <div style={{
        marginTop: 15,
        fontSize: 16,
        color: '#333'
      }}>
        <strong>{paused ? 'PAUSED' : 'ONGOING'}</strong>
      </div>

      <div style={{ marginTop: 30 }}>
        <button onClick={togglePlayPause} style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: 10,
          fontSize: 18,
          cursor: 'pointer',
          marginRight: 20
        }}>
          {paused ? 'Start' : 'Pause'}
        </button>

        <button onClick={reset} style={{
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: 10,
          fontSize: 18,
          cursor: 'pointer'
        }}>
          Reset
        </button>
      </div>
    </div>
  );
}
