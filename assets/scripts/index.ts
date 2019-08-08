///<reference path="_def/leaflet.plugins.d.ts"/>
///<reference path="_def/types.d.ts"/>
///<reference types="leaflet" />

let point = {
    lat: 12,
    lon: 123
} as Type.Point;

console.log(point);

let osm = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


let yandex = L.yandex();


let map = L.map('map', {
    layers: [yandex],
}).setView([51.505, -0.09], 13);

var baseMaps = {
    "Yandex": yandex,
    "OSM": osm,
};

L.control.layers(baseMaps).addTo(map);


map.setView(new L.LatLng(51.505, -0.09), 13);


// add marker
var marker = new L.Marker(new L.LatLng(51.5, -0.09));
marker.addTo(map).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

// add circle
var circle = new L.Circle(new L.LatLng(51.508, -0.11), 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(map).bindPopup("I am a circle.");

// add polygon
var latlongs: L.LatLng[];
latlongs = [
    new L.LatLng(51.509, -0.08),
    new L.LatLng(51.503, -0.06),
    new L.LatLng(51.51, -0.047)
];
var polygon = new L.Polygon(latlongs).addTo(map).bindPopup("I am a polygon.");

// popup on mapclick
var popup = new L.Popup();

function onMapClick(e: any) {

    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

//https://github.com/mpetazzoni/leaflet-gpx
//https://github.com/Luuka/gpx-parser
//https://stackoverflow.com/questions/28196106/export-gpx-file-from-leaflet
//https://github.com/tyrasd/togpx
//https://github.com/shramov/leaflet-plugins/blob/master/examples/yandex.html
//https://github.com/lvoogdt/Leaflet.awesome-markers