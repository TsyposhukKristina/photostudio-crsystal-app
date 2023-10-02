import './style.scss';
import { Component } from "./abstract/Component";
import { Header } from './Common/Header';
import { Footer } from './Common/Footer';
import { MainPage } from './pages/MainPage';

class App {
        constructor(parrent: HTMLElement) {
        const wrap = new Component (parrent, "div", ["wrapper"]);
        new Header(wrap.node);
        //const main = new Component(wrap.node, "div", ["wrapper"]);
        new MainPage(wrap.node);
        new Footer(wrap.node);
        
    }
}

declare global {
    interface Window{
        app: App;
    }
}

window.app = new App(document.body);