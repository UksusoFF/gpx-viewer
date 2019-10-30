import Metadata from './metadata';
import Waypoint from './waypoint';
import Route from './route';
import Track from './track';
import {removeEmpty} from '../utils';

const defaultAttributes = {
    'version': '1.1',
    'creator': 'gpx-parser-builder',
    'xmlns': 'http://www.topografix.com/GPX/1/1',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xsi:schemaLocation': 'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd',
};

export default class GPX {
    private $: any;

    private extensions: any;
    public metadata?: Metadata;
    public wpt: Waypoint[] = [];
    public rte: Route[] = [];
    public trk: Track[] = [];

    constructor(object: any) {
        this.$ = Object.assign({}, defaultAttributes, object.$ || object.attributes || {});

        this.extensions = object.extensions;

        if (object.metadata) {
            this.metadata = new Metadata(object.metadata);
        }

        if (object.wpt) {
            if (!Array.isArray(object.wpt)) {
                object.wpt = [object.wpt];
            }
            this.wpt = object.wpt.map((wpt: any) => new Waypoint(wpt));
        }

        if (object.rte) {
            if (!Array.isArray(object.rte)) {
                object.rte = [object.rte];
            }
            this.rte = object.rte.map((rte: any) => new Route(rte));
        }

        if (object.trk) {
            if (!Array.isArray(object.trk)) {
                object.trk = [object.trk];
            }
            this.trk = object.trk.map((trk: any) => new Track(trk));
        }

        removeEmpty(this);
    }
}
