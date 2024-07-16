import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { generateToken } from './notifications/firebase';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    generateToken();
  }, []);

  useEffect(() => {
    let interval;
    if (seconds !== null && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      handleNotification();
    }
    return () => clearInterval(interval);
  }, [seconds]);

  const handleNotification = () => {
    const notificationTitle = "Descarga completa";
    const notificationOptions = {
      body: "La descarga ha sido completada",
      icon: logo // Opcional, puedes especificar una ruta a un icono
    };

    if (Notification.permission === "granted") {
      new Notification(notificationTitle, notificationOptions);
    } else {
      toast("Permiso de notificación no concedido.");
    }
  };

  const handleButtonClick = () => {
    setSeconds(20);
  };

  return (
    <div className="App">
      <Toaster position='top-right'/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleButtonClick}>Iniciar Descarga</button>
        {seconds !== null && <h2>Contador: {seconds} segundos</h2>}
      </header>
    </div>
  );
}

export default App;
