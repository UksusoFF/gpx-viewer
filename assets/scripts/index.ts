import FileReaderController from './file_reader';
import GPX from './gpx/types/gpx';
import GPXTool from './gpx/gpx';
import ListController from './list';
import MapController from './map/map';
import WayPoint from './gpx/types/way_point';

let input = <HTMLInputElement>document.getElementById('gpx');

let map = new MapController(<HTMLElement>document.getElementById('map'));
let list = new ListController(<HTMLElement>document.getElementById('list'));

new FileReaderController(input, (content: string | null) => {
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

    let download = <HTMLElement>document.getElementById('download');

    download.onclick = function(): void {
        let data = `data:application/javascript;charset=utf-8,${ encodeURIComponent(GPXTool.build(<GPX>gpx)) }`;

        download.setAttribute('href', data);
    };
});
