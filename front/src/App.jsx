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
  let ateList;
  let animationSpeedFactor; // inversely proportional to speed
  let colorFactor;
  let animationEnded;
  let timeBetweenGenerations;
  let counterBetweenGenerations;
  let fade;
  let fadePhase;
  let numberOfFadePhases;
  let fadeHelperRatio;
  let timeBeforeAnimation; // takes place after time between generations
  let counterBeforeAnimation;
  let foodFade;
  let eatenFood;
  let startingFoodQuantity;
  const CANVAS_X = 500;
  const CANVAS_Y = 500;
  p5.setup = () => {


      p5.createCanvas(CANVAS_X, CANVAS_Y, p5.WEBGL);
      startingFoodQuantity = 50;
      animationSpeedFactor = 75;
      timeBetweenGenerations = 600;
      counterBetweenGenerations = 0;
      numberOfFadePhases = 9; // should be an odd number
      timeBeforeAnimation = 300;
      counterBeforeAnimation = 0;
      eatenFood = 0;
      paths = JSON.parse(pathsJsonStr);
      foodMap = JSON.parse(foodJsonStr);
      genes = JSON.parse(genesJsonStr);
      currPoint = [];
      duration = [];
      currentFrame = [];
      ateList = [];
    for (i = 0; i < paths.length; i++) {
        currPoint[i] = 0;
        duration[i] = paths[i][1].moveTime * animationSpeedFactor;
        currentFrame[i] = 0;
        ateList[i] = genes[i].reproduced;
    }

  }

  p5.draw = () => {
    p5.translate(-CANVAS_X / 2, -CANVAS_Y / 2);
    let x;
    let y;
    p5.background(255); // Clear the canvas with a white background
    p5.fill(0, 255, 0);
    p5.stroke(0);
    for (j = 0; j < startingFoodQuantity - eatenFood; j++) {
        p5.ellipse(foodMap[j].x, foodMap[j].y, 5, 5);
    }
    if (counterBeforeAnimation > 0.75 * timeBeforeAnimation) {
        foodFade = 255;
    }
    else if (counterBeforeAnimation < 0.25 * timeBeforeAnimation) {
        foodFade = 0;
    }
    else {
        foodFade = 255 * ((counterBeforeAnimation / timeBeforeAnimation) - 0.25) * 2;
    }
    p5.fill(0, 255, 0, foodFade);
    p5.stroke(0, foodFade);
    for (j = startingFoodQuantity - eatenFood; j < foodMap.length; j++) {
        p5.ellipse(foodMap[j].x, foodMap[j].y, 5, 5);
      }


    // Calculate the current position of the dot
    for (j = 0; j < paths.length; j++) {
        if (currPoint[j] + 1 < paths[j].length && counterBeforeAnimation === timeBeforeAnimation) {
            x = p5.lerp(paths[j][currPoint[j]].x, paths[j][currPoint[j] + 1].x, currentFrame[j] / duration[j]);
            y = p5.lerp(paths[j][currPoint[j]].y, paths[j][currPoint[j] + 1].y, currentFrame[j] / duration[j]);
        }
        else {
            x = paths[j][currPoint[j]].x;
            y = paths[j][currPoint[j]].y;
        }
        colorFactor = genes[j].sight / 15;
        colorFactor *= colorFactor * colorFactor * colorFactor * colorFactor;
        fade = 255;
        fadeHelperRatio = 2 * counterBetweenGenerations / timeBetweenGenerations;
        if (animationEnded && ateList[j] === false && fadeHelperRatio < 1) {

            fadePhase = Math.floor(numberOfFadePhases * fadeHelperRatio);
            if (fadePhase % 2 === 0) {
                fade *= (1 - (numberOfFadePhases * fadeHelperRatio - Math.floor(numberOfFadePhases * fadeHelperRatio)));
            }
            else {
                fade *= (numberOfFadePhases * fadeHelperRatio - Math.floor(numberOfFadePhases * fadeHelperRatio));
            }
        }
        else if (animationEnded && ateList[j] === false) {
            fade = 0;
        }
        p5.stroke(0, fade);
        if (colorFactor > 1) {
            p5.fill(205, 0, 205 / colorFactor, fade);
        }
        else {
            p5.fill(205 * colorFactor, 0, 205, fade);
        }
        p5.ellipse(x, y, 10, 10);
    }

    if (counterBeforeAnimation === timeBeforeAnimation) {
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
                            eatenFood++;
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
                ateList = [];
                counterBeforeAnimation = 0;
                for (i = 0; i < paths.length; i++) {
                    currPoint[i] = 0;
                    duration[i] = paths[i][1].moveTime * animationSpeedFactor;
                    currentFrame[i] = 0;
                    ateList[i] = genes[i].reproduced;
                }
            }

        }
    }
    else {
        counterBeforeAnimation++;
        if (counterBeforeAnimation === timeBeforeAnimation) {
            eatenFood = 0;
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