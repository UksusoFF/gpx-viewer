var GPX = require('gpx-parser-builder');
var map_1 = require('./map');
var file_reader_1 = require("./file_reader");
var map = new map_1.MapController('map');
(window);
as;
any;
gpx = GPX;
var input = document.getElementById('gpx');
if (input !== null) {
    new file_reader_1.FileReaderController(input, function (content) {
        if (content !== null) {
            //console.log(content);
            //console.log(omnivore.gpx.parse(content));
            //map.layerAdd(omnivore.gpx.parse(content));
            // Parse gpx
            var gpx = GPX.parse(content);
            console.log();
            window.console.dir(gpx.metadata);
            window.console.dir(gpx.wpt);
            window.console.dir(gpx.trk);
            // Build gpx
            window.console.log(gpx.toString());
        }
    });
}
//https://github.com/mpetazzoni/leaflet-gpx
//https://github.com/Luuka/gpx-parser
//https://stackoverflow.com/questions/28196106/export-gpx-file-from-leaflet
//https://github.com/tyrasd/togpx
//https://github.com/Sibyx/phpGPX
//https://github.com/kf99916/gpx-parser-builder 
