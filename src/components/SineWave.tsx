// It is necessary to specify the instance of SineWave for now
// due to the limitations of the SineWave module.

import React, { useEffect } from 'react';
import $ from 'jquery';
import SineWaves from 'sine-waves';

const SineWave = ({ instance }: { instance: number }) => {
  useEffect(() => {
    new SineWaves({
      el: document.getElementById('waves-' + instance.toString()),

      speed: 8,
      width: function () {
        return $('#sine-wave-window-' + instance.toString()).width();
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
      <canvas id={'waves-' + instance.toString()} className=""></canvas>
    </>
  );
};

export default SineWave;
