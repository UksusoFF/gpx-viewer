import Link from './link';

export default class Person {
    public name: string;

    public email: string;

    public link: Link;

    constructor(object: any) {
        this.name = object.name;
        this.email = object.emil;
        this.link = new Link(object.link);
    }
}
