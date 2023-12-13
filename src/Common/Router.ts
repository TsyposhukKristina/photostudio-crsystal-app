import { Component } from "../abstract/Component";
import { getAuth } from "firebase/auth";
import { TServices } from "../abstract/Types";

export class Router{
    constructor(public links: Record<string, Component>, private services: TServices){
        this.openPage();

        window.onhashchange = () => {
            this.openPage();
        };
    }

    openPage(){
        Object.values(this.links).forEach((el => el.myRemove()));

        const url = window.location.hash.slice(1);

       //this.links["#" + url].myRender();

      
       const user = this.services.authService.user;
       const emailAdmin = this.services.logicService.emailAdmin;

        console.log(user);
        console.log(emailAdmin);

        if ((url === "reservation" || url === "stat" || url === "client") && !user) {
            this.links["#reg"].myRender();
        } else if ( url === "client" && (emailAdmin || user)) {
            this.links["#client"].myRender();
        } 
        else if (url === "stat" && user && !emailAdmin) {
            this.links["#client"].myRender();
        } else {
            this.links["#" + url].myRender();
        }  


    }

}    




//   
       // console.log(url);
        // восстановить для работы  if (url === "stat" && !user == null) {