import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'


// import React, { Component } from 'react';

import { ReactP5Wrapper } from '@p5-wrapper/react';



function sketch(p5) {
  let duration;  // 5 seconds at 60 frames per second
  let currentFrame;
  let i;
  let j;
  let k;
  // let testMsg;
  // let testMsgInt;
  let path;
  let foodPath;
  let jsonStr;
  let foodJsonStr;
  const CANVAS_X = 500;
  const CANVAS_Y = 500;
  p5.setup = () => {
    // fetch('http://localhost:8080/sketchtest')
    // .then(response => response.text())
    // .then(data => {
    //     testMsg = data;
    //     testMsgInt = Number(testMsg);
    // })
    // .catch(error => console.error('Error:', error));
    jsonStr = '[{"moveTime":1.0,"x":1.8116884180305028,"y":23.93152283236431},{"moveTime":1.0,"x":25.72474093564794,"y":25.97258120724495},{"moveTime":0.3282229467866669,"x":33.57813544609149,"y":26.586461549488696},{"moveTime":0.625,"x":48.57453608088813,"y":26.25787670402119},{"moveTime":0.04677705321333314,"x":48.57453608088813,"y":26.25787670402119},{"moveTime":1.0,"x":61.83958731493599,"y":6.256916333126863},{"moveTime":1.0,"x":85.81238114557712,"y":7.399350555992544},{"moveTime":1.0,"x":108.18807778771058,"y":16.078532532378183},{"moveTime":1.0,"x":118.45068608512551,"y":37.77366726193979},{"moveTime":1.0,"x":137.83173947817363,"y":51.92904678266679},{"moveTime":1.0,"x":152.78297775814502,"y":70.70297748179098},{"moveTime":1.0,"x":138.65380738964532,"y":90.10314615883888},{"moveTime":1.0,"x":115.32733775215642,"y":84.45727915267334},{"moveTime":1.0,"x":99.01112494242392,"y":102.05788140224199},{"moveTime":1.0,"x":75.42453045720912,"y":106.49325743929165},{"moveTime":1.0,"x":52.60251987290698,"y":113.91995474630515},{"moveTime":1.0,"x":31.7486971825713,"y":102.04064166851985},{"moveTime":1.0,"x":13.177511699486711,"y":86.83830402745727},{"moveTime":1.0,"x":8.727404474845514,"y":63.254484453664816},{"moveTime":1.0,"x":28.380625948704683,"y":49.479474990893436},{"moveTime":1.0,"x":40.03830259094233,"y":28.50094846243995},{"moveTime":1.0,"x":53.026418005250534,"y":8.319054151335017}]';
    foodJsonStr = '[{"x":166.6860732776861,"y":93.13856831808498},{"x":235.80497360920822,"y":400.6536954289949},{"x":86.21023071886263,"y":480.8787658918618},{"x":8.301831401019422,"y":256.2028158090152},{"x":278.5135194931748,"y":169.40782314340163},{"x":233.0810885884157,"y":75.942057502347},{"x":155.92833795870936,"y":306.6789161608015},{"x":432.4549544215416,"y":156.19596614526893},{"x":386.3445227283502,"y":166.55501784591138},{"x":48.57453608088813,"y":26.25787670402119}]';
    p5.createCanvas(CANVAS_X, CANVAS_Y, p5.WEBGL);
    path = JSON.parse(jsonStr);
    foodPath = JSON.parse(foodJsonStr);
    duration = path[1].moveTime * 75;
    currentFrame = 0;
    i = 0;
    for (k = 0; k < path.length; k++) {
        path[k].x -= CANVAS_X / 2;
        path[k].y -= CANVAS_Y / 2;
    }
    for (k = 0; k < foodPath.length; k++) {
        foodPath[k].x -= CANVAS_X / 2;
        foodPath[k].y -= CANVAS_Y / 2;
    }
  }

  p5.draw = () => {
    let x;
    let y;
    p5.background(255); // Clear the canvas with a white background
    p5.fill('rgb(0, 255, 0)');
    for (j = 0; j < foodPath.length; j++) {
        p5.ellipse(foodPath[j].x, foodPath[j].y, 5, 5);
      }
    p5.fill(0);

    // Calculate the current position of the dot
    x = p5.lerp(path[i].x, path[i + 1].x, currentFrame / duration);
    y = p5.lerp(path[i].y, path[i + 1].y, currentFrame / duration);


    p5.ellipse(x, y, 10, 10);

    // Update the frame counter
    if (currentFrame < duration) {
      currentFrame++;
    }
    else {
        for (k = 0; k < foodPath.length; k++) {
            if (x === foodPath[k].x && y === foodPath[k].y) {
                foodPath.splice(k, 1);
            }
        }
        currentFrame = 0;
        i++;
        duration = path[i + 1].moveTime * 75;
    }
  };
}


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



  const [showSketch, setShowSketch] = useState(false);
  const toggleSketch = () => {
      setShowSketch(true);
  }

  if (showSketch === false) {
      return (
          <div>
              <h2>Natural selection simulation</h2>
              <button onClick={toggleSketch}>Show sketch</button>
              <button onClick={start}>Start</button>
              <button onClick={reducefood}>Reduce amount of food</button>
              <div id="response">{population}</div>
              <div id="startWarning">{startWarning}</div>

          </div>
      );
  }
  else {
      return (
          <div>

              <h2>Natural selection simulation</h2>
              <button onClick={toggleSketch}>Show sketch</button>
              <button onClick={start}>Start</button>
              <button onClick={reducefood}>Reduce amount of food</button>
              <div id="response">{population}</div>
              <div id="startWarning">{startWarning}</div>
              <div className="sketch-div">
                  <ReactP5Wrapper sketch={sketch}/>
              </div>
          </div>
      );
  }




}

export default App;