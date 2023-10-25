import { Component } from "../abstract/Component";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { TServices } from "../abstract/Types";

export class RegPage extends Component{
    regButton: Component;
    outButton: Component;
    
    constructor(parrent: HTMLElement, private services: TServices) {
        super(parrent, 'div', ['reg_page']);

        new Component (this.node, 'p', null, "Страница для авторизации");
        new Component (this.node, 'a', null, 'Кабинет пользователя (корзина)', ["href"], ["#client"]);
        new Component (this.node, 'p');
        new Component (this.node, 'a', null, 'Кабинет администратора (статистика)', ["href"], ["#stat"]);
        new Component (this.node, 'p');

        this.regButton = new Component (this.node, 'input', null, null, ['type', 'value'], ['button', 'войти']);

        this.regButton.node.onclick = () =>{
            this.services.authService.authWithGoogle();
        }

        this.outButton = new Component (this.node, 'input', null, null, ['type', 'value'], ['button', 'выйти']);

        this.outButton.node.onclick = () =>{
            this.services.authService.outFromGoogle();
        }

     
        const user = this.services.authService.user;
        if (user) {
            this.toggleButtons(true);
        } else {
            this.toggleButtons(false);
        }    

        this.services.authService.addListener("userAuth", (isAuthUser) => {
            if (isAuthUser) {
            this.toggleButtons(true);
            } else {
            this.toggleButtons(false);
            }
        });
    }

    toggleButtons(isAuthUser: boolean): void{
        if (isAuthUser) {
            this.regButton.myRemove();
            this.outButton.myRender();
        } else {
            this.regButton.myRender();
            this.outButton.myRemove();
        }
    }
}