import { Component } from "../abstract/Component";

export class MainPage extends Component{
    constructor (parrent: HTMLElement) {
        super(parrent, "div", ["main_page"]);

        new Component(this.node, "img", ["intro"], null, ['src', 'alt'], ["./assets/intro.png", 'интро']);
        new Component(this.node, 'p', ['text_mainpage_otstup_first'], " ");
        new Component(this.node, 'p', ['text_mainpage'], "Фотостудия Сrystal - это возможность для творчества и проявления себя в самом центре Бреста, 130 квадратных метров света и воздуха, огромные окна и высокие потолки, интересные локации и качественное студийное оборудование.");
        new Component(this.node, 'p', ['text_mainpage_otstup'], " ");
        new Component(this.node, 'p', ['text_mainpage'], "В студии представлены 3 фотозала - “Деловой”, “Циклорама” и “Комфорт”.");
        new Component(this.node, 'p', ['text_mainpage_otstup'], " ");
        new Component(this.node, 'p', ['text_mainpage'], "Наши залы идеально подходят для творческих фотопроектов и коммерческих фотосъемок. Выберите понравившийся зал и забронируйте его:");
        new Component(this.node, 'a', ['border_button'], "Перейти к залам", ["href"], ["#goods"]);
        new Component(this.node, "img", ["groupofphotos"], null, ['src', 'alt'], ["./assets/3photointro.png", 'группафото']);
    }
}