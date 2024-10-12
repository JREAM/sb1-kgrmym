"use client";

import React from 'react';
import { TileType } from '@/types/map';
import { Button } from '@/components/ui/button';

interface TileSelectorProps {
  selectedTile: TileType;
  onSelectTile: (tile: TileType) => void;
}

const TileSelector: React.FC<TileSelectorProps> = ({ selectedTile, onSelectTile }) => {
  const tileTypes: TileType[] = ['empty', 'grass', 'dirt', 'smallHouse', 'water', 'tree', 'bush', 'door'];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tileTypes.map((type) => (
        <Button
          key={type}
          onClick={() => onSelectTile(type)}
          variant={selectedTile === type ? 'default' : 'outline'}
        >
          {type}
        </Button>
      ))}
    </div>
  );
};

export default TileSelector;