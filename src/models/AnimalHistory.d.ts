import { IAnimalPicture } from './SmartFarm'
export interface IAnimalHistory {
  title: string;
  date: string
  description: string
  pictures: Array<IAnimalPicture>
  createdAt?: Date | string;
  updatedAt?: Date;
}