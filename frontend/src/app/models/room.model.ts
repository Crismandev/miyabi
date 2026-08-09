export interface RoomType {
  idTipoHabitacion?: number;
  nameType: string;
  description?: string;
  basePrice: number;
  capacityAdults: number;
  capacityChildren: number;
  hasOnsen: boolean;
  viewType: string;
  primaryImage?: string;
}

export interface Room {
  idHabitacion?: number;
  roomNumber: string;
  floor: number;
  state: 'Available' | 'Occupied' | 'Maintenance' | 'Cleaning';
  roomType: RoomType;
  primaryImage?: string;
}
