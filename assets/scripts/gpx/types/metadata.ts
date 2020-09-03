import Copyright from './copyright';
import Link from './link';
import Person from './person';
import Bounds from './bounds';

export default class Metadata {
    public name: string;

    public desc: string;

    public time: Date;

    public keywords: any;

    public extensions: any;

    public author?: Person;

    public link?: Link[];

    public bounds?: Bounds;

    public copyright?: Copyright;

    constructor(object: any) {
        this.name = object.name;
        this.desc = object.desc;
        this.time = object.time ? new Date(object.time) : new Date();
        this.keywords = object.keywords;
        this.extensions = object.extensions;
        if (object.author) {
            this.author = new Person(object.author);
        }
        if (object.link) {
            if (!Array.isArray(object.link)) {
                object.link = [
                    object.link,
                ];
            }
            this.link = object.link.map((l: any) => {
                return new Link(l);
            });
        }
        if (object.bounds) {
            this.bounds = new Bounds(object.bounds);
        }
        if (object.copyright) {
            this.copyright = new Copyright(object.copyright);
        }
    }
}
