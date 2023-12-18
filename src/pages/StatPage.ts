import { Component } from "../abstract/Component";
import { TServices } from "../abstract/Types";

export class StatPage extends Component {
    constructor(parrent: HTMLElement, private services: TServices) {
        super(parrent, 'div', ['stat_page']);

        new Component(this.node, 'p', null, "Страница администратора со статистикой");

    }
}