import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'


// import React, { Component } from 'react';

import { ReactP5Wrapper } from '@p5-wrapper/react';

var pathsJsonStr;
// var pathsFetchCount = 0;
var foodJsonStr;
var genesJsonStr;
var populationStr;
// var foodFetchCount = 0;
// var foodAndPathsJsonStr;
var evolveDataStrArr;
var currGen = 0;

const evolve = () => {
      fetch('http://localhost:8080/evolve')
        .then(response => response.text())
        .then(data => {
            evolveDataStrArr = data.split(';');
            currGen++;
            populationStr = evolveDataStrArr[0];
            foodJsonStr = evolveDataStrArr[1];
            pathsJsonStr = evolveDataStrArr[2];
            genesJsonStr = evolveDataStrArr[3];
        })

        .catch(error => console.error('Error:', error));
  }

function sketch(p5) {
  let duration;  // 5 seconds at 60 frames per second
  let currentFrame;
  let i;
  let j;
  let k;
  // let testMsg;
  // let testMsgInt;
  let paths;
  let foodMap;
  let genes;
  // let pathsJsonStr;
  // let foodJsonStr;
  let currPoint;
  let animationSpeedFactor; // inversely proportional to speed
  let colorFactor;
  let animationEnded;
  let timeBetweenGenerations;
  let counterBetweenGenerations;
  const CANVAS_X = 500;
  const CANVAS_Y = 500;
  p5.setup = () => {


      p5.createCanvas(CANVAS_X, CANVAS_Y, p5.WEBGL);
      animationSpeedFactor = 75;
      timeBetweenGenerations = 120;
      counterBetweenGenerations = 0;
      paths = JSON.parse(pathsJsonStr);
      foodMap = JSON.parse(foodJsonStr);
      genes = JSON.parse(genesJsonStr);
      currPoint = [];
      duration = [];
      currentFrame = [];
    for (i = 0; i < paths.length; i++) {
        currPoint[i] = 0;
        duration[i] = paths[i][1].moveTime * animationSpeedFactor;
        currentFrame[i] = 0;
    }

  }

  p5.draw = () => {
    p5.translate(-CANVAS_X / 2, -CANVAS_Y / 2);
    let x;
    let y;
    p5.background(255); // Clear the canvas with a white background
    p5.fill('rgb(0, 255, 0)');
    for (j = 0; j < foodMap.length; j++) {
        p5.ellipse(foodMap[j].x, foodMap[j].y, 5, 5);
      }
    p5.fill(0);


    // Calculate the current position of the dot
    for (j = 0; j < paths.length; j++) {
        if (currPoint[j] + 1 < paths[j].length) {
            x = p5.lerp(paths[j][currPoint[j]].x, paths[j][currPoint[j] + 1].x, currentFrame[j] / duration[j]);
            y = p5.lerp(paths[j][currPoint[j]].y, paths[j][currPoint[j] + 1].y, currentFrame[j] / duration[j]);
        }
        else {
            x = paths[j][currPoint[j]].x;
            y = paths[j][currPoint[j]].y;
        }
        colorFactor = genes[j].sight / 15;
        colorFactor *= colorFactor * colorFactor * colorFactor * colorFactor;
        if (colorFactor > 1) {
            p5.fill(205, 0, 205 / colorFactor);
        }
        else {
            p5.fill(205 * colorFactor, 0, 205);
        }
        p5.ellipse(x, y, 10, 10);
    }


    animationEnded = true;
    for (j = 0; j < paths.length; j++) {
        if (currPoint[j] + 1 < paths[j].length) {
            animationEnded = false;
            if (currentFrame[j] < duration[j]) {
                currentFrame[j]++;
            }
            else {
                for (k = 0; k < foodMap.length; k++) {
                    if (paths[j][currPoint[j] + 1].x === foodMap[k].x && paths[j][currPoint[j] + 1].y === foodMap[k].y) {
                        foodMap.splice(k, 1);
                    }
                }
                currentFrame[j] = 0;
                currPoint[j]++;
                if (currPoint[j] + 1 < paths[j].length) {
                    duration[j] = paths[j][currPoint[j] + 1].moveTime * animationSpeedFactor;
                }

            }
        }

    }
    if (animationEnded) {
        if (counterBetweenGenerations < timeBetweenGenerations) {
            if (counterBetweenGenerations === 0) {
                evolve();
            }
            counterBetweenGenerations++;
        }
        else {
            counterBetweenGenerations = 0;
            paths = JSON.parse(pathsJsonStr);
            foodMap = JSON.parse(foodJsonStr);
            genes = JSON.parse(genesJsonStr);
            currPoint = [];
            duration = [];
            currentFrame = [];
            for (i = 0; i < paths.length; i++) {
                currPoint[i] = 0;
                duration[i] = paths[i][1].moveTime * animationSpeedFactor;
                currentFrame[i] = 0;
            }
        }

    }

  };
}


function App() {
  const [population, setPopulation] = useState('');
  const [startWarning, setStartWarning] = useState('');
  const [showSketch, setShowSketch] = useState(false);
  const [evolution, setEvolution] = useState(false)

  useEffect(() => {


      fetch('http://localhost:8080/load')
    .then(response => response.text())
    .then(data => {
        setPopulation(data);
        populationStr = data;
    })
    .catch(error => console.error('Error:', error));

  }, [])

  useEffect(() => {
      const interval = setInterval(() => {
          if (evolution === true) {
          fetch('http://localhost:8080/evolve')
            .then(response => response.text())
            .then(data => {
                evolveDataStrArr = data.split(';');
                currGen++;
                setPopulation(evolveDataStrArr[0] + " current gen: " + currGen);
                if (startWarning !== '') {
                    setStartWarning('');
                }
                populationStr = evolveDataStrArr[0];
                foodJsonStr = evolveDataStrArr[1];
                pathsJsonStr = evolveDataStrArr[2];
                genesJsonStr = evolveDataStrArr[3];
            })

            .catch(error => console.error('Error:', error));


          }
          else {
              setPopulation(populationStr + " current gen: " + currGen);
          }
      }, 1000);

      return () => clearInterval(interval);
  }, [evolution, startWarning])




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




  const toggleSketch = () => {
      if (showSketch === false) {
          setShowSketch(true);
      }
      else {
          setShowSketch(false);
      }
  }

  const toggleEvolution = () => {
      if (evolution === false) {
          setEvolution(true);
          // evolve();
      }
      else {
          setEvolution(false);
      }
  }

  if (showSketch === false) {
      return (
          <div>
              <h2>Simularea selecției naturale</h2>

              <button onClick={toggleSketch}>Deschide animația</button>
              <button onClick={toggleEvolution}>Pornește/oprește evoluția</button>
              <button onClick={reducefood}>Redu cantitatea de hrană</button>
              <div className="current-genes-div" id="response">{population}</div>
              <div id="startWarning">{startWarning}</div>

          </div>
      );
  }
  else {
      return (
          <div>
              <div>

                  <h2>Simularea selecției naturale</h2>
                  <button onClick={toggleSketch}>Închide animația</button>
                  <button onClick={toggleEvolution}>Pornește/oprește evoluția</button>
                  <button onClick={reducefood}>Redu cantitatea de hrană</button>
                  <div className="current-genes-div" id="response">{population}</div>
                  <div id="startWarning">{startWarning}</div>

              </div>
              <div className="sketch-div">
                  <ReactP5Wrapper sketch={sketch}/>
              </div>
          </div>
      );
  }


}

export default App;