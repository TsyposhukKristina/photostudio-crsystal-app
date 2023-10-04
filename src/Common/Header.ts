import { Component } from "../abstract/Component";

export class Header extends Component{
    constructor (parrent: HTMLElement) {
        super(parrent, "div", ["header"]);

        const forhref = new Component (this.node, "a", ['logo_group'], null, ['href'], ['#']);
        new Component(forhref.node, "img", ["logo"], null, ['src', 'alt'], ["./assets/free-icon-diamond-4477730.png", 'лого'], ['href'], ['#']);
        new Component(forhref.node, 'p', ['text-logo'], "Crystal");
        new Component(this.node, 'a', ['text-cabinet'], "Кабинет", ["href"], ["#reg"]);

        //const nav = new Component
    }
}