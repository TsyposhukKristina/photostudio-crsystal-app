export class Component {
    node: HTMLElement;

constructor (
    public parrent: HTMLElement,
        tegName: keyof HTMLElementTagNameMap,
        style?: string[] | null,
        content?: string | null,
        attr?: string[] | null, 
        value?: string[] | null, 
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
        
        this.myRender();
    }

    myRemove(){
        this.node.remove();
    }

    myRender(){
        this.parrent.append(this.node);
    }
}