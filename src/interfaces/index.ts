export interface ICategories{
  id: string;
  name: string;
  cars: ICar[];
}

export interface IImage {
  url: string;
}

export interface IColor{
  hex: string;
}

export interface ICar{
  id: string;
  name: string;
  model: string;
  price: number;
  categories: string;
  description: string;
  image: IImage;
  colorTop: IColor;
  colorBottom: IColor;
}

export interface ICheckout{
  car: ICar[];
}
