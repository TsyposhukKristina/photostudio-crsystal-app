import { Component } from "../abstract/Component";
import { getAuth } from "firebase/auth";

export class Router{
    constructor(public links: Record<string, Component>){
        this.openPage();

        window.onhashchange = () => {
            this.openPage();
        };
    }

    openPage(){
        Object.values(this.links).forEach((el => el.myRemove()));

        const url = window.location.hash.slice(1);

       //this.links["#" + url].myRender();

        const auth = getAuth();
        const user = auth.currentUser;

        console.log(user);


        if ((url === "reservation" || url === "stat" || url === "client") && !user) {
            this.links["#reg"].myRender();
        } else if ( url === "client" && user && user.email === "em000324@g.bstu.by") {
            this.links["#stat"].myRender();
        } else if ( url === "stat" && user && user.email !== "em000324@g.bstu.by") {
            this.links["#client"].myRender();
        } else {
            this.links["#" + url].myRender();
        }  


        /*if (url === "client" && user) {
            this.links["#" + url].myRender();
        } else {
            this.links["#reg"].myRender();
        } */ 

    }

}    




//   
       // console.log(url);
        // восстановить для работы  if (url === "stat" && !user == null) {