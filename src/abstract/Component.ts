export class Component {
    node: HTMLElement;

constructor (
    public parrent: HTMLElement,
        tegName: keyof HTMLElementTagNameMap,
        style?: string[] | null,
        content?: string | null,
        attr?: string[] | null, 
        value?: string[] | null, 
        attr1?: string[] | null, 
        value1?: string[] | null, 
    ){
        this.node = document.createElement(tegName);

        if (content) this.node.innerHTML = content;

        if (style) {
            style.forEach((elStyle) => {
            this.node.classList.add(elStyle);
        });
        }

        if (attr && value && attr.length==value.length) {
            attr.forEach ((elAttr, NumbAttr) => {
            this.node.setAttribute(elAttr, value[NumbAttr]);
            });
        }

        if (attr1 && value1 && attr1.length==value1.length) {
            attr1.forEach ((elAttr1, NumbAttr1) => {
            this.node.setAttribute(elAttr1, value1[NumbAttr1]);
            });
        }
        
        this.myRender();
    }
       // (method) Component.myRemove(): void

    myRemove(){
        this.node.remove();
    }

    myRender(){
        this.parrent.append(this.node);
    }
}