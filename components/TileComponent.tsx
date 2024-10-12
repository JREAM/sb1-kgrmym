"use client";

import React from 'react';
import { Tile } from '@/types/map';

interface TileComponentProps {
  tile: Tile;
  x: number;
  y: number;
  size: number;
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const TileComponent: React.FC<TileComponentProps> = ({ tile, x, y, size, onClick, onDragStart, onDragOver, onDrop }) => {
  const colors: Record<string, string> = {
    empty: '#e0e0e0',
    grass: '#7cfc00',
    dirt: '#8b4513',
    smallHouse: '#ff69b4',
    water: '#00bfff',
    tree: '#228b22',
    bush: '#32cd32',
    woodFloor: '#deb887',
    door: '#8b4513',
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: `${size * 2}px`,
        height: `${size}px`,
        left: `${x * size * 2}px`,
        top: `${y * size}px`,
        backgroundColor: colors[tile.type],
        border: '1px solid #000',
        transformStyle: 'preserve-3d',
        transform: 'rotateX(-60deg)',
        cursor: 'pointer',
      }}
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {tile.type !== 'empty' && tile.type}
    </div>
  );
};

export default TileComponent;