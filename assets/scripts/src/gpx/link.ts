export default class Link {
    private $: any;
    private text: any;
    private type: any;

    constructor(object: any) {
        this.$ = {};
        this.$.href = object.$.href || object.href;
        this.text = object.text;
        this.type = object.type;
    }
}