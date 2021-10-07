export class Counter extends Component{
    constructor(name) {
        super();
        this._count = 0;
    }
    get count () {
        return this._count;
    }
    set count (count) {}

    decrement(){
        console.log('-')
        --this._count;
        this.reRender()
    }
    increment(){
        console.log('+')
        ++this._count;
        this.reRender()
    }
    render() {
        return `
        <div class="card counter">
        <div><button onclick='${this.toHTMLCall("decrement")}'>-</button>
        <button onclick='${this.toHTMLCall("increment")}'>+</button></div>
        <div aria-label="counter" id="${this.id}-counter">${this.count}</div>
        </div>
        `;
    }
}
