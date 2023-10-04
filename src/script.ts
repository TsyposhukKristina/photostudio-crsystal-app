import './style.scss';
import { Component } from "./abstract/Component";
import { Header } from './Common/Header';
import { Footer } from './Common/Footer';
import { MainPage } from './pages/MainPage';
import { Router } from './Common/Router';
import { ClientPage } from './pages/ClientPage';
import { GoodsPage } from './pages/GoodsPage';
import { RegPage } from './pages/RegPage';
import { ReservationPage } from './pages/ReservationPage';
import { StatPage } from './pages/StatPage';

class App {
        constructor(parrent: HTMLElement) {
        const wrap = new Component (parrent, "div", ["wrapper"]);
        new Header(wrap.node);
        const main = new Component(wrap.node, 'main');
        //new MainPage(main.node);
        const links = {
            "#": new MainPage(main.node),
            "#client": new ClientPage(main.node),
            "#goods": new GoodsPage(main.node),
            "#reg": new RegPage(main.node),
            "#reservation": new ReservationPage(main.node),
            "#stat": new StatPage(main.node)
        };

        new Router(links);
        new Footer(wrap.node);
        
    }
}

declare global {
    interface Window{
        app: App;
    }
}

window.app = new App(document.body);