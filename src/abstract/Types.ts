import { LogicService } from "../servises/LogicService";
import { AuthService } from "../servises/AuthService";
import { DBService } from "../servises/DBService";

export type TServices = {
    logicService: LogicService;
    authService: AuthService;
    dbService: DBService;
  };

  export type TDataUser = {
    name: string;
    fotoUrl: string;
    email: string;
    //basket: TGoodBasket[];
  };

  export type TGood = {
    name: string;
    numbers: number;
    price: number;
    square: number;
    url: string;
    //id: string;
  };