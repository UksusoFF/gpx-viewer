import FileReaderController from './file_reader';
import GPX from './gpx/types/gpx';
import GPXTool from './gpx/gpx';
import ListController from './list/list';
import MapController from './map/map';
import WayPoint from './gpx/types/way_point';

let input = <HTMLInputElement>document.getElementById('gpx');
let storage = new GPX({
    wpt: [],
});

let map = new MapController(<HTMLElement>document.getElementById('map'), storage);
let list = new ListController(<HTMLElement>document.getElementById('list'), storage);

new FileReaderController(input, (content: string | null) => {
    if (content === null) {
        throw new Error('Can\'t read input');
    }

    let gpx = GPXTool.parse(content);

    if (gpx === null) {
        throw new Error('Can\'t parse input');
    }

    gpx.wpt.forEach((point: WayPoint): void => {
        storage.wpt.push(point);
        map.pointAdd(point);
        list.itemAdd(point);
    });

    let download = <HTMLElement>document.getElementById('download');
    download.style.removeProperty('display');
    download.onclick = function(): void {
        storage.wpt.sort(function(a: WayPoint, b: WayPoint) {
            return a.name.localeCompare(b.name);
        });
        let data = `data:application/javascript;charset=utf-8,${ encodeURIComponent(GPXTool.build(storage)) }`;

        download.setAttribute('href', data);
    };

    let clear = <HTMLElement>document.getElementById('clear');
    clear.style.removeProperty('display');
    clear.onclick = function(): void {
        if (confirm('Are you sure?')) {
            map.clear();
        }
    };
});
