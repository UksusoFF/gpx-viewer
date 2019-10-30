import GPXTool from './gpx/gpx';
import { MapController, MapPoint } from './map';
import { FileReaderController } from './file_reader';
import WayPoint from "./gpx/types/way_point";

let input = <HTMLInputElement>document.getElementById('gpx');
let container = <HTMLElement>document.getElementById('map');

let map = new MapController(container);

new FileReaderController(input, (content) => {
    if (content === null) {
        throw new Error('Can\'t read input');
    }

    let gpx = GPXTool.parse(content);

    if (gpx === null) {
        throw new Error('Can\'t parse input');
    }

    gpx.wpt.forEach((point: WayPoint): void => {
        map.pointAdd({
            lat: point.$.lat,
            lon: point.$.lon,
            name: point.name,
            icon: 'star'
        } as MapPoint)
    });
});
