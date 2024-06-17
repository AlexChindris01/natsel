import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'


// import React, { Component } from 'react';

import { ReactP5Wrapper } from '@p5-wrapper/react';



function sketch(p5) {
  let duration;  // 5 seconds at 60 frames per second
  let currentFrame;
  let i;
  // let testMsg;
  // let testMsgInt;
  let path;
  let jsonStr;
  p5.setup = () => {
    // fetch('http://localhost:8080/sketchtest')
    // .then(response => response.text())
    // .then(data => {
    //     testMsg = data;
    //     testMsgInt = Number(testMsg);
    // })
    // .catch(error => console.error('Error:', error));
    jsonStr = '[{"moveTime":1.0,"x":6.380567179186369,"y":4.825801743947808},{"moveTime":0.2099747127033977,"x":7.8831212825723815,"y":4.074768132989005},{"moveTime":0.625,"x":3.0,"y":3.0},{"moveTime":0.16502528729660226,"x":3.0,"y":3.0},{"moveTime":1.0,"x":10.70264854413496,"y":0.8391655765571526},{"moveTime":1.0,"x":18.309836661156847,"y":3.315188385870704},{"moveTime":1.0,"x":21.629889900350822,"y":10.593735389834999},{"moveTime":1.0,"x":25.544044238361863,"y":17.570797509253843},{"moveTime":1.0,"x":33.13669921579386,"y":15.050561331099678},{"moveTime":1.0,"x":40.343342336081946,"y":11.577191938592684},{"moveTime":1.0,"x":43.25549660586431,"y":4.126060648044358},{"moveTime":1.0,"x":51.19285104449212,"y":5.125262587391626},{"moveTime":1.0,"x":52.00161263484865,"y":13.084276640021763},{"moveTime":1.0,"x":45.5876439008508,"y":17.865594981159287},{"moveTime":1.0,"x":37.792630202566386,"y":19.664973052482374},{"moveTime":1.0,"x":35.15122468957602,"y":27.216329017866613},{"moveTime":1.0,"x":36.3939008403018,"y":35.11922443564973},{"moveTime":1.0,"x":43.32558560560026,"y":39.11318817040361},{"moveTime":1.0,"x":50.50949203128556,"y":42.6333427787976},{"moveTime":1.0,"x":53.00159301583005,"y":50.23527889289593},{"moveTime":1.0,"x":46.507844742751224,"y":54.90766943370967},{"moveTime":1.0,"x":39.54209961710497,"y":58.84192855640805}]\n'
    p5.createCanvas(720, 400, p5.WEBGL);
    path = JSON.parse(jsonStr);
    duration = path[0].moveTime * 30;
    currentFrame = 0;
    i = 0;
  }

  p5.draw = () => {
    let x;
    let y;
    p5.background(255); // Clear the canvas with a white background
    p5.fill(0);

    // Calculate the current position of the dot
    x = p5.lerp(path[i].x, path[i + 1].x, currentFrame / duration);
    y = p5.lerp(path[i].y, path[i + 1].y, currentFrame / duration);
    // Draw the dot
    p5.ellipse(x, y, 10, 10);

    // Update the frame counter
    if (currentFrame < duration) {
      currentFrame++;
    }
    else {
        currentFrame = 0;
        i++;
        duration = path[i].moveTime * 30;
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
              <ReactP5Wrapper sketch={sketch}/>

          </div>
      );
  }




}

export default App;