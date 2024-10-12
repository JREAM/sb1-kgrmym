"use client";

import React from 'react';
import { Tile } from '@/types/map';
import TileComponent from './TileComponent';

interface IsometricGridProps {
  map: Tile[][];
  onTileClick: (x: number, y: number) => void;
  onTileDrag: (fromX: number, fromY: number, toX: number, toY: number) => void;
  gridSize: number;
}

const IsometricGrid: React.FC<IsometricGridProps> = ({ map, onTileClick, onTileDrag, gridSize }) => {
  const tileSize = 50;
  const gridWidth = gridSize * tileSize * 2;
  const gridHeight = gridSize * tileSize;

  const isDiamondTile = (x: number, y: number) => {
    const halfSize = Math.floor(gridSize / 2);
    return Math.abs(x - halfSize) + Math.abs(y - halfSize) <= halfSize;
  };

  return (
    <div
      style={{
        width: `${gridWidth}px`,
        height: `${gridHeight}px`,
        position: 'relative',
        transform: 'rotateX(60deg) rotateZ(-45deg)',
        transformStyle: 'preserve-3d',
      }}
    >
      {map.map((row, y) =>
        row.map((tile, x) => (
          isDiamondTile(x, y) && (
            <TileComponent
              key={`${x}-${y}`}
              tile={tile}
              x={x}
              y={y}
              size={tileSize}
              onClick={() => onTileClick(x, y)}
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', `${x},${y}`);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const [fromX, fromY] = e.dataTransfer.getData('text').split(',').map(Number);
                onTileDrag(fromX, fromY, x, y);
              }}
            />
          )
        ))
      )}
    </div>
  );
};

export default IsometricGrid;