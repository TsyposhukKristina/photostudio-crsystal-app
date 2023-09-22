export class Component {
    node: HTMLElement;

    constructor (
        public parrent: HTMLElement,
        tegName: keyof HTMLElementTagNameMap,
        content?: string | null
    ){
        this.node = document.createElement(tegName);
        if (content) this.node.innerHTML = content;
        this.myRender();
    }

    myRemove(){
        this.node.remove();
    }

    myRender(){
        this.parrent.append(this.node);
    }
}