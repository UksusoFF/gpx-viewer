import * as Mustache from 'mustache';

class TemplateBuilder {

    private template: string;

    constructor(
        private id: string,
        private data: any,
    ) {
        this.template = (<HTMLElement>document.getElementById(this.id)).innerHTML;
    }

    public get element(): HTMLElement {
        const html = new DOMParser().parseFromString(this.string, 'text/html');

        return <HTMLElement>html.body.firstChild;
    }

    public get string(): string {
        return Mustache.render(this.template, this.data);
    }

}

export default TemplateBuilder;