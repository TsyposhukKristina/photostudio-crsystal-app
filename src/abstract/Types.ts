import { LogicService } from "../servises/LogicService";
import { AuthService } from "../servises/AuthService";
import { DBService } from "../servises/DBService";
import { Timestamp } from "firebase/firestore";

export type TServices = {
  logicService: LogicService;
  authService: AuthService;
  dbService: DBService;
};

export type TDataUser = {
  name: string;
  fotoUrl: string;
  email: string;
  basket: TGoodBasket[];
};

export type TGood = {
  name: string;
  numbers: number;
  price: string;
  square: string;
  url: string;
  id: string;
  date: string[]
};

export type TGoodBasket = {
  good: TGood;
  count: number;
};
export type TDataBasket = {
  summa: number,
  count: number
}
export type TDataHistory = {
  basket: TGoodBasket[],
  dataBasket: TDataBasket,
  date: string,
  data: Timestamp,
  id: string
}
export type TDataGraph = {
  x: Date,
  y: number
}
