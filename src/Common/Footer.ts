import { Component } from "../abstract/Component";

export class Footer extends Component {
    constructor (parrent: HTMLElement) {
        super(parrent, "div", ["footer"]);

        new Component(this.node, "p", ['contacts'], "+375333039839");
        new Component(this.node, "p", ['contacts'], "ул. Куйбышева 15, г. Брест");
    }
}