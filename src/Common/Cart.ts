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
  

  
      //new Component(this.node, "span", [], data.square);
  
      this.btnBasket = new Component(
        this.node,
        "input",
        [],
        null,
        ["value", "type"],
        ["забронировать", "button"]
      );

    }
  }