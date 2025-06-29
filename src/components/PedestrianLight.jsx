import React from 'react';
import useLightFSM from '../hooks/useLightFSM';
import PedestrianLightStates from '../models/PedestrianLightStates';
import { FaHandPaper, FaWalking } from 'react-icons/fa';

export default function PedestrianLight() {
  const {
    current,
    secondsLeft,
    paused,
    togglePlayPause,
    reset
  } = useLightFSM(PedestrianLightStates, 'walk')

  const renderIcon = () => {
    return (
      <div style={{
            backgroundColor: '#222',
            padding: 30,
            borderRadius: 20,
            display: 'inline-block'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20
        }}>
          <FaHandPaper
            size={100}
            color={current === 'stop' ? 'red' : '#444'}
            style={current === 'stop' ? { filter: 'drop-shadow(0 0 15px red)' } : {}}
          />
          <FaWalking
            size={100}
            color={current === 'walk' ? 'green' : '#444'}
            style={current === 'walk' ? { filter: 'drop-shadow(0 0 15px green)' } : {}}
          />
        </div>
      </div>
    )
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: 40,
      borderRadius: 20,
      width: 300,
      margin: 'auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ marginBottom: 30 }}>Pedestrian Signal Simulation</h2>

      {renderIcon()}

      <div style={{
        marginTop: 20,
        fontSize: 40,
        fontWeight: 'bold'
      }}>
        {secondsLeft}s
      </div>

      <div style={{ marginTop: 10 }}>
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