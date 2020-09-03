import * as xml2js from 'xml2js';
import GPX from './types/gpx';
import {
    allDatesToISOString,
} from './utils';

export default class GPXTool {
    static ROOT_NAME = 'gpx';

    static parse(string: string): GPX | null {
        let gpx = null;

        xml2js.parseString(string, {
            async: false,
            explicitArray: false,
        }, (err: Error, xml: any) => {
            if (err) {
                gpx = null;
            } else if (!xml[GPXTool.ROOT_NAME]) {
                gpx = null;
            } else {
                gpx = new GPX({
                    attributes: xml[GPXTool.ROOT_NAME].$,
                    metadata: xml[GPXTool.ROOT_NAME].metadata,
                    wpt: xml[GPXTool.ROOT_NAME].wpt,
                    rte: xml[GPXTool.ROOT_NAME].rte,
                    trk: xml[GPXTool.ROOT_NAME].trk,
                });
            }
        });

        return gpx;
    }

    static build(gpx: GPX) {
        let builder = new xml2js.Builder({
            rootName: GPXTool.ROOT_NAME,
        });

        allDatesToISOString(gpx);

        return builder.buildObject(gpx);
    }
}
