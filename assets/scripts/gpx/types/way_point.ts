import Link from './link';

export default class WayPoint {
    public $: {
        lat: number;
        lon: number;
    };

    public ele: any;
    public time: Date;
    public magvar: any;
    public geoidheight: any;
    public name: string;
    public cmt: string;
    public desc: string;
    public src: any;
    public sym: any;
    public type: any;
    public sat: any;
    public hdop: any;
    public vdop: any;
    public pdop: any;
    public ageofdgpsdata: any;
    public dgpsid: any;
    public extensions: any;
    public link?: Link[];

    constructor(object: any) {
        this.$ = {
            lat: object.$.lat || object.lat || -1,
            lon: object.$.lon || object.lon || -1,
        };

        this.ele = object.ele;
        this.time = object.time ? new Date(object.time) : new Date();
        this.magvar = object.magvar;
        this.geoidheight = object.geoidheight;
        this.name = object.name;
        this.cmt = object.cmt;
        this.desc = object.desc;
        this.src = object.src;
        this.sym = object.sym;
        this.type = object.type;
        this.sat = object.sat;
        this.hdop = object.hdop;
        this.vdop = object.vdop;
        this.pdop = object.pdop;
        this.ageofdgpsdata = object.ageofdgpsdata;
        this.dgpsid = object.dgpsid;
        this.extensions = object.extensions;
        if (object.link) {
            if (!Array.isArray(object.link)) {
                object.link = [object.link];
            }
            this.link = object.link.map((l: any) => new Link(l));
        }
    }
}
