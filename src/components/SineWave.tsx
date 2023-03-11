/* eslint-disable */

import React, { useEffect } from 'react';
import $ from 'jquery';
import SineWaves from 'sine-waves';

const SineWave = () => {
  useEffect(() => {
    let waves = new SineWaves({
      el: document.getElementById('waves'),
      speed: 8,
      width: function () {
        return $('#sine-wave-window').width();
      },

      ease: 'SineInOut',
      wavesWidth: '100%',
      waves: [
        {
          timeModifier: 4,
          lineWidth: 2,
          amplitude: -35,
          wavelength: 30,
          strokeStyle: 'rgba(255,255,255,.5)', // Stroke color and opacity
        },
      ],
      // Called on window resize
      resizeEvent: function () {
        var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
      },
    });
  });

  return (
    <>
      <canvas id="waves" className=""></canvas>
    </>
  );
};

export default SineWave;
