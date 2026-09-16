import React from 'react';

export const AtmosphereEffects: React.FC = () => {
  return (
    <div className="atmosphere-overlay" aria-hidden="true">
      {/* Static Serene Warm Candlelight & Gold Mist Layer */}
      <div className="ambient-mist-layer" />

      <style>{`
        .atmosphere-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          overflow: hidden;
        }

        .ambient-mist-layer {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 15% 15%, rgba(212, 175, 55, 0.035) 0%, transparent 60%),
            radial-gradient(circle at 85% 85%, rgba(138, 37, 37, 0.02) 0%, transparent 60%);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};
