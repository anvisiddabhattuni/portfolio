import React from 'react';

/**
 * WatercolorDogPair — Anvi's watercolor dogs (golden retriever + poodle),
 * cropped with their real alpha from the artwork she provided. The two
 * crops sit side by side, bottom-aligned, matching the original image's
 * proportions (the poodle is the little one).
 */
export const WatercolorDogPair: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: '4%',
      ...style,
    }}
  >
    <img
      src="/dogs/entry-golden.png"
      alt="Watercolor drawing of a golden retriever with a red collar"
      style={{ width: '54%', height: 'auto' }}
      loading="lazy"
      draggable={false}
    />
    <img
      src="/dogs/entry-poodle.png"
      alt="Watercolor drawing of a white poodle with a blue collar"
      style={{ width: '36%', height: 'auto' }}
      loading="lazy"
      draggable={false}
    />
  </div>
);
