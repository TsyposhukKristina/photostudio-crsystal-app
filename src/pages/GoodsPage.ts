import { Cart } from "../Common/Cart";
import { Component } from "../abstract/Component";
import { TGood, TServices } from "../abstract/Types";

export class GoodsPage extends Component{
    constructor(parrent: HTMLElement, private services: TServices) {
        super(parrent, 'div', ['goods_page']);

        new Component (this.node, 'p', null, "Страница для каталога");


        const carts = new Component(this.node, "div", ["carts"]);

        services.dbService.getAllGoods().then((goods) => {
          // console.log(goods);
          this.putGoodsOnPage(carts, goods);
        });
      }
    
      putGoodsOnPage(teg: Component, goods: TGood[]) {
        goods.forEach((product) => {
          new Cart(teg.node, this.services, product);
        });
    }
}       
 /*new Component (this.node, 'a', null, "Забронировать зал №1", ['href'], ['#reservation']);
        new Component (this.node, 'p', null);
        new Component (this.node, 'a', null, "Забронировать зал №2", ['href'], ['#reservation']);
        new Component (this.node, 'p', null);
        new Component (this.node, 'a', null, "Забронировать зал №3", ['href'], ['#reservation']);*/