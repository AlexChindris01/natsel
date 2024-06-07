import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'


function App() {
  const [response, setResponse] = useState('');

  useEffect(() => {
      fetch('http://localhost:8080/load')
    .then(response => response.text())
    .then(data => {
        setResponse(data);
    })
    .catch(error => console.error('Error:', error));
  }, [])

  const start = () => {
      fetch('http://localhost:8080/start')
        .then(response => response.text())
        .then(data => {
          setResponse(data);
        })
        .catch(error => console.error('Error:', error));

  };

  const reducefood = () => {
      fetch('http://localhost:8080/reducefood')
        .then(response => response.text())
        .then(data => {
          setResponse(data);
        })
        .catch(error => console.error('Error:', error));

  };

  return (
      <div>
          <h2>Natural selection simulation</h2>
          <button onClick={start}>Start</button>
          <button onClick={reducefood}>Reduce amount of food</button>
          <div id="response">{response}</div>
      </div>
  );
}

export default App;