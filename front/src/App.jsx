import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'


function App() {
  const [population, setPopulation] = useState('');
  const [startWarning, setStartWarning] = useState('');

  useEffect(() => {
      fetch('http://localhost:8080/load')
    .then(response => response.text())
    .then(data => {
        setPopulation(data);
    })
    .catch(error => console.error('Error:', error));
  }, [])

  const start = () => {
      fetch('http://localhost:8080/start')
        .then(response => response.text())
        .then(data => {
          setPopulation(data);
          if (startWarning !== '') {
              setStartWarning('');
          }
        })
        .catch(error => console.error('Error:', error));

  };

  const reducefood = () => {
      fetch('http://localhost:8080/reducefood')
        .then(response => response.text())
        .then(data => {
          if (data === '') {
              setStartWarning('Start evolution first');
          }
          else {
              setPopulation(data);
          }
        })
        .catch(error => console.error('Error:', error));

  };

  return (
      <div>
          <h2>Natural selection simulation</h2>
          <button onClick={start}>Start</button>
          <button onClick={reducefood}>Reduce amount of food</button>
          <div id="response">{population}</div>
          <div id="startWarning">{startWarning}</div>
      </div>
  );
}

export default App;