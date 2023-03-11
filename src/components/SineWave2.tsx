// Although this fails the coding principle of DRY, this file is currently
// necessary due to the constraints of the sine-waves Node module.

// /* eslint-disable */

import React, { useEffect } from 'react';
import $ from 'jquery';
import SineWaves from 'sine-waves';

const SineWave2 = () => {
  useEffect(() => {
    new SineWaves({
      el: document.getElementById('waves2'),
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
        this.ctx.createLinearGradient(0, 0, this.width, 0);
      },
    });
  });

  return (
    <>
      <canvas id="waves2" className=""></canvas>
    </>
  );
};

export default SineWave2;
