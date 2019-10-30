import TrackSegment from './track-segment';
import Link from './link';

export default class Track {

    public name: string;
    public cmt: string;
    public desc: string;
    public src: any;
    public number: any;
    public type: any;
    public extensions: any;
    public link?: [Link];
    public trkseg?: [TrackSegment];

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
                object.link = [object.link];
            }
            this.link = object.link.map((l: any) => new Link(l));
        }
        if (object.trkseg) {
            if (!Array.isArray(object.trkseg)) {
                object.trkseg = [object.trkseg];
            }
            this.trkseg = object.trkseg.map((seg:any) => new TrackSegment(seg));
        }
    }
}