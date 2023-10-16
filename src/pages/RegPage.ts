import { Component } from "../abstract/Component";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export class RegPage extends Component{
    regButton: Component;
    outButton: Component;
    constructor(parrent: HTMLElement) {
        super(parrent, 'div', ['reg_page']);

        new Component (this.node, 'p', null, "Страница для авторизации");
        new Component (this.node, 'a', null, 'Кабинет пользователя (корзина)', ["href"], ["#client"]);
        new Component (this.node, 'p');
        new Component (this.node, 'a', null, 'Кабинет администратора (статистика)', ["href"], ["#stat"]);
        new Component (this.node, 'p');

        this.regButton = new Component (this.node, 'input', null, null, ['type', 'value'], ['button', 'войти']);

        this.regButton.node.onclick = () =>{
            this.authWithGoogle();
        }

        this.outButton = new Component (this.node, 'input', null, null, ['type', 'value'], ['button', 'выйти']);

        this.outButton.node.onclick = () =>{
            this.outFromGoogle();
        }

        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            this.toggleButtons(true);
        } else {
            this.toggleButtons(false);
        }    
        
    }

    authWithGoogle(): void{
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(() => {
            this.toggleButtons(true)
            window.location.reload();
        })
        .catch(() => {
            console.log('bad');
        })
    }

    outFromGoogle(): void { 
        const auth = getAuth();
        signOut(auth)
        .then(()=> {
            this.toggleButtons(false);
            window.location.reload();
        })
        .catch(()=>{
            console.log("out bad");
        });
    }

    toggleButtons(isAuthUser: boolean): void{
        if (isAuthUser){
            this.regButton.myRemove();
            this.outButton.myRender();
        } else {
            this.regButton.myRender();
            this.outButton.myRemove();
        }
    }
}