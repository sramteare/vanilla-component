let __UNIQUE_ID_COUNT = 0;
class CustEvents {
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
class Component extends CustEvents {
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
        this._container_id = containerId;
        const container = document.getElementById(containerId);
        if(!container) {
            throw new Error("Error getting container with container Id");
        }
        try{
            let template = document.createElement("template");
            template.innerHTML = this.render();
            container.appendChild( template.content);
            this.__content = container.lastElementChild;
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
    reRender(){
        if(this._container_id) {
            this.__content.remove();
            this.renderComponent(this._container_id);
        }
    }
}
Component._register = [];