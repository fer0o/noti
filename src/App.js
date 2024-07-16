import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { generateToken } from './notifications/firebase';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  useEffect(() => {
    generateToken();
  }, []);

  const handleNotification = () => {
    setTimeout(() => {
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
    }, 20000); // 20000 milisegundos = 20 segundos
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
        <button onClick={handleNotification}>Iniciar Descarga</button>
      </header>
    </div>
  );
}

export default App;
