"use client";

import { useState, useEffect } from 'react';
import IsometricGrid from '@/components/IsometricGrid';
import Figure from '@/components/Figure';
import TileSelector from '@/components/TileSelector';
import { Tile, TileType, Position } from '@/types/map';

const GRID_SIZE = 32;

export default function Home() {
  const [map, setMap] = useState<Tile[][]>(() => 
    Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(null).map(() => ({ type: 'empty' }))
    )
  );
  const [figurePosition, setFigurePosition] = useState<Position>({ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) });
  const [selectedTile, setSelectedTile] = useState<TileType>('grass');
  const [isInHouse, setIsInHouse] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInHouse) return;
      const newPosition = { ...figurePosition };
      switch (e.key) {
        case 'ArrowUp':
          if (newPosition.y > 0) newPosition.y--;
          break;
        case 'ArrowDown':
          if (newPosition.y < GRID_SIZE - 1) newPosition.y++;
          break;
        case 'ArrowLeft':
          if (newPosition.x > 0) newPosition.x--;
          break;
        case 'ArrowRight':
          if (newPosition.x < GRID_SIZE - 1) newPosition.x++;
          break;
      }
      if (canMoveTo(newPosition)) {
        setFigurePosition(newPosition);
        if (map[newPosition.y][newPosition.x].type === 'smallHouse') {
          setIsInHouse(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [figurePosition, map, isInHouse]);

  const canMoveTo = (position: Position): boolean => {
    const tile = map[position.y][position.x];
    return !['water', 'tree'].includes(tile.type);
  };

  const handleTileClick = (x: number, y: number) => {
    if (isInHouse && map[y][x].type !== 'door') return;
    const newMap = [...map];
    newMap[y][x] = { type: selectedTile };
    setMap(newMap);
    if (selectedTile === 'door' && isInHouse) {
      setIsInHouse(false);
      setFigurePosition({ x, y });
    }
  };

  const handleTileDrag = (fromX: number, fromY: number, toX: number, toY: number) => {
    const newMap = [...map];
    const temp = newMap[fromY][fromX];
    newMap[fromY][fromX] = newMap[toY][toX];
    newMap[toY][toX] = temp;
    setMap(newMap);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Isometric Map Editor</h1>
      <TileSelector selectedTile={selectedTile} onSelectTile={setSelectedTile} />
      <div className="relative">
        <IsometricGrid
          map={isInHouse ? Array(8).fill(null).map(() => Array(8).fill({ type: 'woodFloor' })) : map}
          onTileClick={handleTileClick}
          onTileDrag={handleTileDrag}
          gridSize={isInHouse ? 8 : GRID_SIZE}
        />
        {!isInHouse && (
          <Figure position={figurePosition} />
        )}
      </div>
    </div>
  );
}