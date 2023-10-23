import { Component } from "../abstract/Component";
import { TServices } from "../abstract/Types";

export class ReservationPage extends Component{
    constructor(parrent: HTMLElement, private services: TServices) {
        super(parrent, 'div', ['reservation_page']);

        new Component (this.node, 'p', null, "Страница для бронирования фотозала");
    }
}