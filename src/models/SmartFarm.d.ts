export interface IAnimalPicture {
  barcode?: string;
  fileName: string;
  id?: number
  pictureType?: string;
  data?: any
  url?: string
}
export interface IFormDetails {
  detailId: number,
  detailTypeName: string
  description: string,
  other?: string
}
export interface IAnimalDetails extends IFormDetails {
  value: string,
  barcode?: string
}
export interface IAnimalType {
  id: number,
  animalTypeName: string,
  description: null,
  animalSpeciesName: null
}
export interface IAnimalDetails {
  id?: number,
  value: string,
  detailId?: number,
  detailTypeName?: string,
  description?: string
  detailTypeId?: number
}
export interface IAnimalForm {
  barcode: string;
  animalName: string;
  sex: string;
  DOB: string;
  description: string,
  animalTypeOther?: string
  isActive: boolean,
  father: string,
  mother: string,
  buyDate: string,
  animalTypeId: number,
  pictures: Array<IAnimalPicture>,
  animalType: IAnimalType,
  animalDetails: Array<IAnimalDetails>
}