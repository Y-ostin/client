import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  

const serverUrl = 'http://192.168.95.49:8080';  

function App() {
  const [ledState, setLedState] = useState('off');
  const [led2State, setLed2State] = useState('off');

  const toggleLed = async () => {
    const newState = ledState === 'on' ? 'off' : 'on';
    try {
      await axios.get(`${serverUrl}/led/${newState}`);
      setLedState(newState);
    } catch (error) {
      console.error('Error cambiando el estado del LED 1:', error);
    }
  };

  const toggleLed2 = async () => {
    const newState = led2State === 'on' ? 'off' : 'on';
    try {
      await axios.get(`${serverUrl}/led2/${newState}`);
      setLed2State(newState);
    } catch (error) {
      console.error('Error cambiando el estado del LED 2:', error);
    }
  };

  const fetchLedStates = async () => {
    try {
      const response1 = await axios.get(`${serverUrl}/led/status`);
      setLedState(response1.data);

      const response2 = await axios.get(`${serverUrl}/led2/status`);
      setLed2State(response2.data);
    } catch (error) {
      console.error('Error obteniendo el estado de los LEDs:', error);
    }
  };

  useEffect(() => {
    fetchLedStates();
    const interval = setInterval(() => {
      fetchLedStates();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>Control de LEDs con ESP32</h1>

      <div className="row">
        <div className="col">
          {/* Control del primer LED */}
          <button className="btn-primary" onClick={toggleLed}>
            {ledState === 'on' ? 'Apagar LED 1' : 'Encender LED 1'}
          </button>
        </div>

        <div className="col">
          {/* Control del segundo LED */}
          <button className="btn-secondary" onClick={toggleLed2}>
            {led2State === 'on' ? 'Apagar LED 2' : 'Encender LED 2'}
          </button>
        </div>
      </div>

      <div>
        <h3>Estado del LED 1: <span className="badge">{ledState}</span></h3>
        <h3>Estado del LED 2: <span className="badge">{led2State}</span></h3>
      </div>
    </div>
  );
}

export default App;
