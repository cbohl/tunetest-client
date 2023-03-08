/* eslint-disable */

import React, { useEffect } from 'react';
import $ from 'jquery';
// import styles from './SineWave.module.css';
import SineWaves from 'sine-waves';

// const SineWaves2 = require('sine-waves');
// debugger;

const SineWave = () => {
  // debugger;
  // useEffect(() => {
  // var waves = new SineWaves({
  //   el: document.getElementById('waves'),
  //   speed: 8,
  //   width: function () {
  //     return $(window).width();
  //   },
  //   height: function () {
  //     return $(window).height();
  //   },
  //   ease: 'SineInOut',
  //   wavesWidth: '70%',
  //   waves: [
  //     {
  //       timeModifier: 4,
  //       lineWidth: 3,
  //       amplitude: -75,
  //       wavelength: 25,
  //     },
  //   ],
  //   // Called on window resize
  //   resizeEvent: function () {
  //     var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
  //     gradient.addColorStop(0, 'rgba(23, 210, 168, 0.2)');
  //     gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
  //     gradient.addColorStop(1, 'rgba(23, 210, 168, 0.2)');
  //     var index = -1;
  //     var length = this.waves.length;
  //     while (++index < length) {
  //       this.waves[index].strokeStyle = gradient;
  //     }
  //     // Clean Up
  //     // index = void 0;
  //     // length = void 0;
  //     // gradient = void 0;
  //   },
  // });
  // var waves = new SineWaves({
  //   // Canvas Element
  //   el: document.getElementById('waves'),
  //   running: false,
  //   waves: [{}],
  // });

  // render(){}
  useEffect(() => {
    let waves = new SineWaves({
      el: document.getElementById('waves'),
      speed: 8,
      width: function () {
        return $('#sine-wave-window').width();
      },
      // height: function () {
      //   return $(window).height();
      // },
      ease: 'SineInOut',
      wavesWidth: '70%',
      waves: [
        {
          timeModifier: 4,
          lineWidth: 3,
          amplitude: -75,
          wavelength: 25,
          strokeStyle: 'rgba(0,255,0,0.3)', // Stroke color and opacity
        },
      ],
      // Called on window resize
      resizeEvent: function () {
        var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0, 'rgba(23, 210, 168, 0.2)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(23, 210, 168, 0.2)');
      },
    });
    // waves.running = false;
    // waves.update();
  });

  // console.log('inside');
  // debugger;
  // });

  // or

  // And then update the animation one frame

  // debugger;
  return (
    <>
      {/* <h1>This is where it should be</h1> */}
      <canvas id="waves"></canvas>
      {/* {waves} */}
    </>
  );
};

export default SineWave;
