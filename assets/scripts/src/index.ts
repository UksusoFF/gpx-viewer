import * as GPX from 'gpx-parser-builder';
import { MapController } from './map';
import { FileReaderController } from "./file_reader";

let map = new MapController('map');

(window as any).gpx = GPX;

let input = <HTMLInputElement>document.getElementById('gpx');

if (input !== null) {
    new FileReaderController(
        input,
        (content) => {
            if (content !== null) {
                //console.log(content);
                //console.log(omnivore.gpx.parse(content));
                //map.layerAdd(omnivore.gpx.parse(content));


// Parse gpx
                const gpx = GPX.parse(content);

                console.log();

                window.console.dir(gpx.metadata);
                window.console.dir(gpx.wpt);
                window.console.dir(gpx.trk);

// Build gpx
                window.console.log(gpx.toString());
            }
        }
    );
}

//https://github.com/mpetazzoni/leaflet-gpx
//https://github.com/Luuka/gpx-parser
//https://stackoverflow.com/questions/28196106/export-gpx-file-from-leaflet
//https://github.com/tyrasd/togpx
//https://github.com/Sibyx/phpGPX
//https://github.com/kf99916/gpx-parser-builder