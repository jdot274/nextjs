import React from 'react';

const SplineViewer: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10 -mt-16">
      <spline-viewer
        loading="lazy"
        events-target="global"
        url="https://prod.spline.design/vpImYv1Vpdjyp8nN/scene.splinecode"
        className="w-[clamp(250px,40vh,400px)] h-[clamp(250px,40vh,400px)] absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ visibility: 'visible', pointerEvents: 'none' }}
      />
    </div>
  );
};

export default SplineViewer;