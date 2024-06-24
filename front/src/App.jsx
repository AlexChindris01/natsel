import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'


// import React, { Component } from 'react';

import { ReactP5Wrapper } from '@p5-wrapper/react';

var pathsJsonStr;
// var pathsFetchCount = 0;
var foodJsonStr;
// var foodFetchCount = 0;
// var foodAndPathsJsonStr;
var evolveDataStrArr;
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
  // let pathsJsonStr;
  // let foodJsonStr;
  let currPoint;
  let animationSpeedFactor; // inversely proportional to speed
  const CANVAS_X = 500;
  const CANVAS_Y = 500;
  p5.setup = () => {


      p5.createCanvas(CANVAS_X, CANVAS_Y, p5.WEBGL);
      animationSpeedFactor = 75;
      paths = JSON.parse(pathsJsonStr);
      foodMap = JSON.parse(foodJsonStr);
      currPoint = [];
      duration = [];
      currentFrame = [];
    for (i = 0; i < paths.length; i++) {
        currPoint[i] = 0;
        duration[i] = paths[i][1].moveTime * animationSpeedFactor;
        currentFrame[i] = 0;
    }
    i = 0;

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
        x = p5.lerp(paths[j][currPoint[j]].x, paths[j][currPoint[j] + 1].x, currentFrame[j] / duration[j]);
        y = p5.lerp(paths[j][currPoint[j]].y, paths[j][currPoint[j] + 1].y, currentFrame[j] / duration[j]);

        if (j === 0) p5.fill('red');
        if (j === 1) p5.fill('blue');
        if (j === 2) p5.fill('green');
        if (j === 3) p5.fill('yellow');
        if (j === 4) p5.fill('purple');
        if (j === 5) p5.fill('orange');
        if (j === 6) p5.fill('brown');
        if (j === 7) p5.fill('white');
        if (j === 8) p5.fill('black');
        if (j === 9) p5.fill('pink');
        p5.ellipse(x, y, 10, 10);
    }


    // Update the frame counter
    for (j = 0; j < paths.length; j++) {
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
            duration[j] = paths[j][currPoint[j] + 1].moveTime * animationSpeedFactor;
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
                setPopulation(evolveDataStrArr[0]);
                if (startWarning !== '') {
                    setStartWarning('');
                }
                foodJsonStr = evolveDataStrArr[1];
                pathsJsonStr = evolveDataStrArr[2];
            })

            .catch(error => console.error('Error:', error));

          // fetch('http://localhost:8080/getfoodandpaths')
          //     .then(response => response.text())
          //     .then(data => {
          //         foodAndPathsJsonStr = data.split(";");
          //         foodJsonStr = foodAndPathsJsonStr[0];
          //         pathsJsonStr = foodAndPathsJsonStr[1];

                  // pathsFetchCount++;
                  // console.log('fetched paths data number ' + pathsFetchCount);
                  // paths = JSON.parse(pathsJsonStr);
          //    })
          //    .catch(error => console.error('Error:', error));
              //console.log(pathsJsonStr);
          // fetch('http://localhost:8080/getfoodmap')
          //     .then(response => response.text())
          //     .then(data => {
          //         foodJsonStr = data;
          //         foodFetchCount++;
          //         console.log('fetched food data number ' + foodFetchCount);
          //         // foodMap = JSON.parse(foodJsonStr);
          //     })
          //     .catch(error => console.error('Error:', error));
      }
      }, 3000);

      return () => clearInterval(interval);
  }, [evolution, startWarning])

  // var lklk = 0;
  // const evolve = () => {
  //     if (evolution === true) {
  //         fetch('http://localhost:8080/evolve')
  //           .then(response => response.text())
  //           .then(data => {
  //               setPopulation(data);
  //               if (startWarning !== '') {
  //                   setStartWarning('');
  //               }
  //           })
  //           .catch(error => console.error('Error:', error));
  //     }
  //     else {
  //         lklk++;
  //         console.log(lklk);
  //     }
  // };


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
              <h2>Natural selection simulation</h2>

              <button onClick={toggleSketch}>Toggle sketch</button>
              <button onClick={toggleEvolution}>Toggle evolution</button>
              <button onClick={reducefood}>Reduce amount of food</button>
              <div className="current-genes-div" id="response">{population}</div>
              <div id="startWarning">{startWarning}</div>

          </div>
      );
  }
  else {
      return (
          <div>
              <div>

                  <h2>Natural selection simulation</h2>
                  <button onClick={toggleSketch}>Toggle sketch</button>
                  <button onClick={toggleEvolution}>Toggle evolution</button>
                  <button onClick={reducefood}>Reduce amount of food</button>
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