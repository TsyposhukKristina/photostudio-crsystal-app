import { Component } from "../abstract/Component";

export class GoodsPage extends Component{
    constructor(parrent: HTMLElement) {
        super(parrent, 'div', ['goods_page']);

        new Component (this.node, 'p', null, "Страница для каталога");
        new Component (this.node, 'a', null, "Забронировать зал №1", ['href'], ['#reservation']);
        new Component (this.node, 'p', null);
        new Component (this.node, 'a', null, "Забронировать зал №2", ['href'], ['#reservation']);
        new Component (this.node, 'p', null);
        new Component (this.node, 'a', null, "Забронировать зал №3", ['href'], ['#reservation']);
    }
}