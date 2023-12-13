import { Component } from "../abstract/Component";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { TGoodBasket, TServices } from "../abstract/Types";
import { CartBasket } from "../Common/CartBasket";

export class ClientPage extends Component {
   divBasket: Component;

    constructor(parrent: HTMLElement, private services: TServices) {
      super(parrent, 'div', ['client_page']);

      //new Component (this.node, 'p', null, "Личный кабинет с корзиной клиента");

      this.divBasket = new Component (this.node, 'div', ['client__goods']); 
        
      services.dbService.addListener('goodInBasket', (good) => {
        this.putGoodsInBasket(this.divBasket, good as TGoodBasket)
      });
    }
        

    putGoodsInBasket(teg: Component, product: TGoodBasket) {
      new CartBasket(teg.node, this.services, product);
       }
  }
