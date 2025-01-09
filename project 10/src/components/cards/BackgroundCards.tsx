import React from 'react';
import CardWrapper from './CardWrapper';

const BackgroundCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <CardWrapper>
        <h3 className="text-2xl font-bold text-white mb-4">Animated Waves</h3>
        <p className="text-white/70">
          Dynamic wave animations create a fluid, engaging background effect that responds
          to user interaction and adds depth to the interface.
        </p>
      </CardWrapper>

      <CardWrapper>
        <h3 className="text-2xl font-bold text-white mb-4">Particle System</h3>
        <p className="text-white/70">
          Interactive particles float gracefully across the screen, creating an immersive
          atmosphere while maintaining optimal performance.
        </p>
      </CardWrapper>

      <CardWrapper>
        <h3 className="text-2xl font-bold text-white mb-4">Gradient Effects</h3>
        <p className="text-white/70">
          Smooth color transitions and subtle gradient overlays enhance the visual
          experience while maintaining readability and accessibility.
        </p>
      </CardWrapper>

      <CardWrapper>
        <h3 className="text-2xl font-bold text-white mb-4">Blur Elements</h3>
        <p className="text-white/70">
          Strategic use of backdrop blur creates depth and hierarchy in the interface,
          making content more engaging and easier to read.
        </p>
      </CardWrapper>
    </div>
  );
};

export default BackgroundCards;