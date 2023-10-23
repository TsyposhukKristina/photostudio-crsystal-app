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
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../configFB";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LogicService } from './servises/LogicService';

initializeApp(firebaseConfig);

const services = {
    logicService: new LogicService()
  };

class App {
        constructor(parrent: HTMLElement) {
        const wrap = new Component (parrent, "div", ["wrapper"]);
        new Header(wrap.node, services);
        const main = new Component(wrap.node, 'main');
        //new MainPage(main.node);
        const links = {
            "#": new MainPage(main.node, services),
            "#client": new ClientPage(main.node, services),
            "#goods": new GoodsPage(main.node, services),
            "#reg": new RegPage(main.node, services),
            "#reservation": new ReservationPage(main.node, services),
            "#stat": new StatPage(main.node, services)
        };

        new Router(links, services);
        new Footer(wrap.node);
        
    }
}

declare global {
    interface Window{
        app: App;
    }
}

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    services.logicService.user = user;
    if (!window.app) window.app = new App(document.body);
});