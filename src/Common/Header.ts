import { Component } from "../abstract/Component";

export class Header extends Component{
    constructor (parrent: HTMLElement) {
        super(parrent, "div", ["header"]);

        new Component(this.node, "img", ["logo"], null, ['src', 'alt'], ["./assets/free-icon-diamond-4477730.png", 'лого']);
        new Component(this.node, 'p', ['text-logo'], "Crystal");
        new Component(this.node, 'p', ['text-cabinet'], "Кабинет");
    }
}