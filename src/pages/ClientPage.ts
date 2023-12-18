import { Component } from "../abstract/Component";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { TDataHistory, TGoodBasket, TServices } from "../abstract/Types";
import { CartBasket } from "../Common/CartBasket";
import { Timestamp } from "firebase/firestore";
import { Graph } from "../Common/Graph";

export class ClientPage extends Component {
  divBasket: Component;
  divDates: Component;
  btnOplata: Component;
  nullBasket: Component;
  fullBasket: Component;
  constructor(parrent: HTMLElement, private services: TServices) {
    super(parrent, 'div', ['client_page']);
    let isBasketClear = false;
    if (services.dbService.dataUser) {
      if (services.dbService.dataUser.basket.length > 0) isBasketClear = true;
    }
    this.nullBasket = new Component(this.node, 'div', []);
    new Component(this.nullBasket.node, 'p', null, "Корзина пуста");

    this.fullBasket = new Component(this.node, 'div', ["fullbasket"]);
    this.toggleBasket(isBasketClear);
    const user = services.authService.user;
    this.services.dbService.calcDataBasket(user);
    this.divBasket = new Component(this.fullBasket.node, 'div', ['client__goods']);
    if (services.dbService.dataUser) {
      services.dbService.dataUser.basket.forEach(el => {
        this.putGoodsInBasket(this.divBasket, el);
      })
    };

    this.divDates = new Component(this.fullBasket.node, 'select', ["basket__dates"]);
    this.updateSelectOptions();
    this.btnOplata = new Component(this.fullBasket.node, 'input', ['basket__btn'], null, ['type', 'value'], ['button', 'Забронировать']);
    this.btnOplata.node.onclick = async () => {
      const selectedDate = (this.divDates.node as HTMLSelectElement).value; // Получаем выбранную дату из элемента select
      const user = this.services.dbService.dataUser; // Используем информацию о пользователе из this.services.dbService.dataUser

      const user1 = this.services.authService.user;
      this.services.dbService.calcDataBasket(user1);
      if (user && this.services.dbService.dataUser) {
        await this.services.dbService.addBasketInHistory(user1, selectedDate);
        const goods = user.basket.map((el) => el.good);
        goods?.forEach(async (good) => {
          await this.services.dbService.removeDateFromGood(good.id, good.date, selectedDate);
        });
      }
    };

    services.dbService.addListener('goodInBasket', (good) => {
      this.putGoodsInBasket(this.divBasket, good as TGoodBasket);
      this.updateSelectOptions();
      this.toggleBasket(true);
    });
    services.dbService.addListener("clearBasket", () => {//очистить корзину
      this.fullBasket.node.innerHTML = '';
      this.toggleBasket(false);
    });
    const divGraph = new Component(this.node, "div", ["stat__graph"]);
    const graph = new Graph(divGraph.node);
    services.dbService.getAllHistory(user).then((historys) => {
      graph.graphik.data.datasets[0].data = services.dbService.updateDataGraph(historys);
      graph.graphik.update();
    });
    services.dbService.addListener('addInHistory', (history) => {
      const user = services.authService.user;
      services.dbService.getAllHistory(user).then((historys) => {
        graph.graphik.data.datasets[0].data = services.dbService.updateDataGraph(historys);
        graph.graphik.update();
      });
    });
  }

  updateSelectOptions() {
    this.divDates.node.innerHTML = ''; // Очистка текущих вариантов выбора

    if (this.services.dbService.dataUser) {
      this.services.dbService.dataUser.basket.forEach(el => {
        el.good.date.forEach(date => {
          new Component(this.divDates.node, 'option', null, date); // Вариант выбора для каждой даты
        });
      });
    }
  }
  putGoodsInBasket(teg: Component, product: TGoodBasket) {
    new CartBasket(teg.node, this.services, product);

  }
  toggleBasket(isBasketClear: boolean) {
    if (isBasketClear) {
      this.nullBasket.myRemove();
      this.fullBasket.myRender();
    } else {
      this.nullBasket.myRender();
      this.fullBasket.myRemove();
    }
  }
}
