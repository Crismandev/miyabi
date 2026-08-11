export interface RoomType {
  idTipo?: number;
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
  idRoom?: number;
  idHabitacion?: number;
  roomNumber: string;
  floor: number;
  state: 'Available' | 'Occupied' | 'Maintenance' | 'Cleaning';
  additionalDescription?: string;
  roomType: RoomType;
  primaryImage?: string;
}
