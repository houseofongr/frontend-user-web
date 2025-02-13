export interface BaseHome {
  widht: number;
  height: number;
  borderImageId: number;
}

export interface BaseRoom {
  name: string;
  width: number;
  height: number;
  imageId: number;
  roomId: number;
}

export interface Room extends BaseRoom {
  x: number;
  y: number;
  z: number;
}

export interface UserMainHomeDetail {
  homeName: string;
  house: BaseHome;
  rooms: Room[];
}

export interface HomeListItem {
  id: number;
  basicImageId: number;
  name: string;
}
