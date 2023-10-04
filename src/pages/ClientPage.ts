import { Component } from "../abstract/Component";

export class ClientPage extends Component {
    constructor(parrent: HTMLElement) {
        super(parrent, 'div', ['client_page']);

        new Component (this.node, 'p', null, "Личный кабинет с корзиной клиента");
    }
}