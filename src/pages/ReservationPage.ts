import { Component } from "../abstract/Component";

export class ReservationPage extends Component{
    constructor(parrent: HTMLElement) {
        super(parrent, 'div', ['reservation_page']);

        new Component (this.node, 'p', null, "Страница для бронирования фотозала");
    }
}