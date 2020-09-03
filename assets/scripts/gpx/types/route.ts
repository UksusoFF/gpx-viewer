import WayPoint from './way_point';
import Link from './link';

export default class Route {
    public name: string;

    public cmt: string;

    public desc: string;

    public src: any;

    public number: any;

    public type: any;

    public extensions: any;

    public link?: Link[];

    public rtept?: WayPoint[];

    constructor(object: any) {
        this.name = object.name;
        this.cmt = object.cmt;
        this.desc = object.desc;
        this.src = object.src;
        this.number = object.number;
        this.type = object.type;
        this.extensions = object.extensions;

        if (object.link) {
            if (!Array.isArray(object.link)) {
                this.link = [
                    object.link,
                ];
            }
            this.link = object.link.map((l: any) => {
                return new Link(l);
            });
        }

        if (object.rtept) {
            if (!Array.isArray(object.rtept)) {
                this.rtept = [
                    object.rtept,
                ];
            }
            this.rtept = object.rtept.map((pt: any) => {
                return new WayPoint(pt);
            });
        }
    }
}
