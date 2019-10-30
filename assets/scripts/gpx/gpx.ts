import * as xml2js from 'xml2js';
import Metadata from './metadata';
import Waypoint from './waypoint';
import Route from './route';
import Track from './track';
import { allDatesToISOString, removeEmpty } from './utils';

const defaultAttributes = {
    'version': '1.1',
    'creator': 'gpx-parser-builder',
    'xmlns': 'http://www.topografix.com/GPX/1/1',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xsi:schemaLocation': 'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd'
};

export default class GPX {
    private $: any;
    private extensions: any;
    public metadata?: Metadata;
    public wpt?: [Waypoint];
    public rte?: [Route];
    public trk?: [Track];

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

    static parse(gpxString: string): GPX | null {
        let gpx = null;

        xml2js.parseString(gpxString, {
            explicitArray: false
        }, (err, xml) => {
            if (err) {
                gpx = null;
            } else if (!xml.gpx) {
                gpx = null;
            } else {
                gpx = new GPX({
                    attributes: xml.gpx.$,
                    metadata: xml.gpx.metadata,
                    wpt: xml.gpx.wpt,
                    rte: xml.gpx.rte,
                    trk: xml.gpx.trk
                });
            }
        });

        return gpx;
    }

    toString(options: any) {
        options = options || {};
        options.rootName = 'gpx';

        const builder = new xml2js.Builder(options), gpx = new GPX(this);
        allDatesToISOString(gpx);
        return builder.buildObject(gpx);
    }
}