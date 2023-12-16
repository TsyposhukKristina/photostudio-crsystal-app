import { Component } from "../abstract/Component";
import { TGood, TServices } from "../abstract/Types";

export class Cart extends Component {
    btnBasket: Component;

    constructor(
      parrent: HTMLElement,
      private services: TServices,
      private data: TGood
    ) {
      super(parrent, "div", ["cart"]);

      new Component(this.node, "h3", [], data.name);
  
      new Component(
        this.node,
        "img",
        [],
        null,
        ["src", "alt"],
        [data.url, data.name]
      );

      new Component(this.node, 'p', ['text_goods_otstup'], " ");
      new Component(this.node, "span", [], data.square);
      new Component(this.node, 'p', ['text_goods_otstup'], " ");
      new Component(this.node, "span", [], data.price);
      new Component(this.node, 'p', ['text_goods_otstup'], " ");
  
      this.btnBasket = new Component(
        this.node,
        "input",
        [],
        null,
        ["value", "type"],
        ["забронировать", "button"]
      );
      if (services.dbService.dataUser) {
        const index = services.dbService.dataUser.basket.findIndex(el => el.good.id === data.id);
        if (index >= 0) {
          (this.btnBasket.node as HTMLInputElement).disabled = true;
        };
      }
  
      this.btnBasket.node.onclick = () => {
        (this.btnBasket.node as HTMLInputElement).disabled = true;
        this.addGoodInBasket();
      };

      services.dbService.addListener('delGoodFromBasket', (idGood) => {
         if (idGood === data.id) {
          (this.btnBasket.node as HTMLInputElement).disabled = false;
         }
      })
    }


    addGoodInBasket() {
      const user = this.services.authService.user;
      this.services.dbService.addGoodInBasket(user, this.data)
        .catch(() => {
          (this.btnBasket.node as HTMLInputElement).disabled = false;
        });
  
      /*if (services.dbService.dataUser) {
        const index = services.dbService.dataUser.basket.findIndex((el) => el.good.id === data.id);
        if (index >= 0) {
          (this.btnBasket.node as HTMLInputElement).disabled = true;
        }
      }


      this.btnBasket.node.onclick = () => {
        (this.btnBasket.node as HTMLInputElement).disabled = true;
        this.addGoodInBasket();
      };
    }

    addGoodInBasket() {
      const user = this.services.authService.user;
      this.services.dbService.addGoodInBasket(user, this.data)
        .catch(() => {
          (this.btnBasket.node as HTMLInputElement).disabled = false;
          
        });*/
    }
  }