export interface IAnimalType {
  id: number,
  animalTypeName: string,
  description: null,
  animalSpeciesName: null
}
export interface IAnimalDetails {
  id: number,
  value: string,
  detailTypeId: number
}
export interface IAnimalForm {
  barcode: string;
  animalName: string;
  sex: string;
  DOB: string | Date;
  description: string,
  isActive: boolean,
  father: string,
  mother: string,
  buyDate: string,
  animalTypeId: number,
  pictures: Array<any>,
  animalType: IAnimalType,
  animalDetails: Array<IAnimalDetails>
}

export interface IAnimalPictureClient {
  data: string
  fileName: string
  pictureType: string
}
export interface IAnimalHistoryClient {
  barcode: string
  date: string
  description: string
  pictures: Array<IAnimalPictureClient>
  title: string
}