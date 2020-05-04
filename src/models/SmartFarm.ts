export interface IAnimal {

}
export interface IFormDetails {
  detailsId: number,
  detailTypeName: string
  description: string,
  other?:string
}
export interface IAnimalDetails extends IFormDetails {
  value: string,
  barcode?: string
}