export type Product = {
  id: string;
  name: string;
  brand: string;
  thumbnail: string;
  information?: Information;
  categories: Category[];
  options: Option[];
  images: Image[];

  createAt: string;
  updateAt: string;
};

export type Category = {
  id: string;
  name: string;

  createAt: string;
  updateAt: string;
};

export type Option = {
  id: string;
  name: string;
  sale: number;
  quantity: number;
  price: number;
  status: boolean;

  bookId: string;

  createAt: string;
  updateAt: string;
};

export type Image = {
  id: string;
  url: string;
  bookId: string;

  createAt: string;
  updateAt: string;
};

export type Information = {
  id: string;
  author: string;
  translator: string;
  category: string;
  format: string;
  numberOfPage: string;
  isbn: string;
  publisher: string;
  company: string;
  gift: string;
  price: string;
  released: string;
  introduce: string;

  createAt: string;
  updateAt: string;
};

export type Billboard = {
  id: string;
  thumbnail: string;
  url: string;

  createAt: string;
  updateAt: string;
};

export type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  avatar: string;
  address: string;
  totalPrice: number;
  totalOrder: number;
  rank: string;
  role: [string];
};

export type Voucher = {
  id: string;
  name: string;
  title: string;
  code: string;
  quantity: number;
  type: boolean;
  day: number;
  expire: boolean;
  shelfLife: string;

  createAt: string;
  updateAt: string;
};

export type PriceType = "Low" | "Medium" | "High" | "Highest" | "Max";
export type FilterType =
  | "Alphabet"
  | "ReverseAlphabet"
  | "HighToLow"
  | "LowToHigh"
  | "Lasted"
  | "Oldest";

export type Order = {
  id: string;
  name: string;
  email: string;
  address: string;
  numberPhone: string;
  products: ProductOrder[];
  status: string;
  payment: string;
  shipping: boolean;
  quantity: number;
  totalPrice: number;
  createAt: string;
};

export type ProductOrder = {
  productId: string;
  name: string;
  thumbnail: string;
  option: string;
  price: number;
  sale: number;
  quantity: number;
};

export type Statistical = {
  totalPrice: number;
  totalOrder: number;
  totalProduct: number;
  orders: Order[];
};

export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: string[];
};

export type Attribute = "billboard" | "category" | "product" | "voucher";
