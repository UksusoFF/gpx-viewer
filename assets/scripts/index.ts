import GPXTool from './gpx/gpx';
import {
    MapController,
} from './map';
import {
    ListController,
} from './list';
import {
    FileReaderController,
} from './file_reader';
import WayPoint from './gpx/types/way_point';

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
        map.pointAdd(point);
        list.itemAdd(point);
    });

    console.log(GPXTool.build(gpx));
});
