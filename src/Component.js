let __UNIQUE_ID_COUNT = 0;
class Events {
    constructor() {
        this._register = {};
    }
    dispatch (eventName, data) {
        this._register[eventName].forEach(
            callback => callback(data)
        );
    }
    attach (eventName, callback){
        if(!Array.isArray(this._register[eventName])) this._register[eventName] = [];
        this._register[eventName].push(callback);
        console.log(eventName, this._register[eventName]);
    }
}
class Component extends Events {
    constructor() {
        super();
        this.__id = __UNIQUE_ID_COUNT++;
        Component._register[this.id] = this;
    }
    static getComp(id){
        return Component._register[id];
    }
    get id(){
        return this.__id;
    }
    renderComponent (containerId) {
        const container = document.getElementById(containerId);
        if(!container) {
            throw new Error("Error getting container with container Id");
        }
        try{
            let template = document.createElement("template");
            template.innerHTML = this.render();
            container.appendChild( template.content);
        } catch (e){
            throw e;
        }
    }
    static actionCallback (callbackName, compId, args){
        const comp = Component.getComp(compId);
        if(!comp) throw new Error(`Component with id not registered ${compId}`);
        comp[callbackName](...args);
    }
    toHTMLCall(callbackName, ...args){
        console.log("generating html code for callback",args)
        return `Component.actionCallback("${callbackName}", ${this.id}, ${JSON.stringify(args)})`;
    }
    render () {
        // can throw or pass silent
        return '';
    }
}
Component._register = [];


class C extends Component{
    constructor(name) {
        super();
        this.name = name;
    }
    handle (...args) {
        console.log("handleing - ", args);
    }
    edit () {
        
    }  
    commit (msg) {

       this.dispatch("commit", {x:msg});
    }
    render() {
        return `<button onclick='${this.toHTMLCall("commit", this.name)}'>Click</button>`;
    }
}

//console.log();

//x.commit();