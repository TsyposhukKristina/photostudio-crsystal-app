import { Component } from "../abstract/Component";

export class RegPage extends Component{
    constructor(parrent: HTMLElement) {
        super(parrent, 'div', ['reg_page']);

        new Component (this.node, 'p', null, "Страница для авторизации");
        new Component (this.node, 'a', null, 'Кабинет пользователя (корзина)', ["href"], ["#client"]);
        new Component (this.node, 'p');
        new Component (this.node, 'a', null, 'Кабинет администратора (статистика)', ["href"], ["#stat"]);
        
    }
}