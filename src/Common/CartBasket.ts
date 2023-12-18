import { User } from "firebase/auth";
import { Component } from "../abstract/Component";
import { TGood, TGoodBasket, TServices } from "../abstract/Types";

export class CartBasket extends Component {
  btnDel: Component;

  constructor(
    parrent: HTMLElement,
    private services: TServices,
    private data: TGoodBasket
  ) {
    super(parrent, "div", ["cart_basket"]);

    new Component(
      this.node,
      "img",
      ["cart_basket__image"],
      null,
      ["src", "alt"],
      [data.good.url, data.good.name]
    );

    const divName = new Component(this.node, "div", ["cart_basket__name"]);
    new Component(divName.node, "h3", [], data.good.name);
    new Component(divName.node, "span", [], `Цена: ${data.good.price}`);

    /*const divCount = new Component(this.node, "div", ["cart_basket__count"]);
    const btnDec = new Component(
        divCount.node,
        "input",
        ["count__button"],
        null,
        ["value", "type"],
        ["-", "button"]
    ); кнопка для уменьшения кол-ва тоаров - нет такого */

    /*const divNumber = new Component(divCount.node, "div", ["div__count"]);
    this.spanCount = new Component(
    divNumber.node,
    "span",
    ["count__number"],
    data.count.toString()
    );*/

    /*const btnInk = new Component(
        divCount.node,
        "input",
        ["count__button"],
        null,
        ["value", "type"],
        ["+", "button"]
      );*/

    this.btnDel = new Component(
      this.node,
      "input",
      ["cart_basket__del"],
      null,
      ["value", "type"],
      ["удалить", "button"]
    );

    this.btnDel.node.onclick = () => {
      (this.btnDel.node as HTMLInputElement).disabled = true;
      this.delGoodFromBasket()
    };


  }

  delGoodFromBasket() {
    const user = this.services.authService.user;
    this.services.dbService.delGoodFromBasket(user, this.data)
      .then(() => {
        this.myRemove();
      })
      .catch(() => {
        (this.btnDel.node as HTMLInputElement).disabled = false;
      });
  }


}
