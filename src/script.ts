import './style.scss';
import { Component } from "./abstract/component";

const body = document.body;

const btn1 = new Component(body, 'input');
(btn1.node as HTMLInputElement).type = 'button';
(btn1.node as HTMLInputElement).value = 'показать';

const btn2 = new Component(body, 'input');
(btn2.node as HTMLInputElement).type = 'button';
(btn2.node as HTMLInputElement).value = 'скрыть';

//const prg = document.createElement('p');
const prg = new Component (body, 'p');
prg.node.innerHTML = 'Здравствуйте';

btn2.node.onclick = () => {
    prg.myRemove();
}

btn1.node.onclick = () => {
    prg.myRender();
}