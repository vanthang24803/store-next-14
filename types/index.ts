export type Product = {
  id: string;
  name: string;
  brand: string;
  thumbnail: string;
  information?: Information;
  categories: Category[];
  options: Option[];

  createdAt: string;
  updateAt: string;
};

export type Category = {
  id: string;
  name: string;

  createdAt: string;
  updateAt: string;
};

export type Option = {
  id: string;
  name: string;
  sale: number;
  quantity: number;
  price: number;
  status: boolean;

  createdAt: string;
  updateAt: string;
};

export type Image = {
  id: string;
  url: string;

  createdAt: string;
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

  createdAt: string;
  updateAt: string;
};
