import GPXTool from './gpx/gpx';
import { MapController } from './map';
import { FileReaderController } from './file_reader';

let map = new MapController('map');

let input = <HTMLInputElement>document.getElementById('gpx');

if (input !== null) {
    new FileReaderController(
        input,
        (content) => {
            if (content !== null) {
                let gpx = GPXTool.parse(content);


                console.log(gpx!);

                console.dir(gpx!.metadata!);
                console.dir(gpx!.wpt);
                console.dir(gpx!.trk);

                console.log(GPXTool.build(gpx!));
            }
        }
    );
}

