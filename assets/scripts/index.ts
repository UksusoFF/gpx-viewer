import GPXTool from './gpx/gpx';
import { MapController, MapPoint } from './map';
import { ListController, ListItem } from './list';
import { FileReaderController } from './file_reader';
import WayPoint from "./gpx/types/way_point";

let input = <HTMLInputElement>document.getElementById('gpx');

let map = new MapController(<HTMLElement>document.getElementById('map'));
let list = new ListController(<HTMLElement>document.getElementById('list'));

new FileReaderController(input, (content) => {
    if (content === null) {
        throw new Error('Can\'t read input');
    }

    let gpx = GPXTool.parse(content);

    if (gpx === null) {
        throw new Error('Can\'t parse input');
    }

    gpx.wpt.forEach((point: WayPoint): void => {
        console.log(point);
        map.pointAdd({
            lat: point.$.lat,
            lon: point.$.lon,
            name: point.name,
            icon: 'star'
        } as MapPoint)
        list.itemAdd({
            lat: point.$.lat,
            lon: point.$.lon,
            name: point.name,
            type: point.type,
            icon: 'star'
        } as ListItem)
    });
});
