import { Component } from "../abstract/Component";

export class StatPage extends Component{
    constructor(parrent: HTMLElement) {
        super(parrent, 'div', ['stat_page']);

        new Component (this.node, 'p', null, "Страница администратора со статистикой");
    }
}