export type TileType = 'empty' | 'grass' | 'dirt' | 'smallHouse' | 'water' | 'tree' | 'bush' | 'woodFloor' | 'door';

export interface Tile {
  type: TileType;
}

export interface Position {
  x: number;
  y: number;
}