"use client";

import React from 'react';
import { Position } from '@/types/map';

interface FigureProps {
  position: Position;
}

const Figure: React.FC<FigureProps> = ({ position }) => {
  const size = 25;

  return (
    <div
      style={{
        position: 'absolute',
        width: `${size * 2}px`,
        height: `${size}px`,
        left: `${position.x * 100}px`,
        top: `${position.y * 50}px`,
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: 'rotateX(-60deg)',
        transformStyle: 'preserve-3d',
        zIndex: 1000,
      }}
    />
  );
};

export default Figure;