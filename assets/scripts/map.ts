///<reference path="_def/leaflet.plugins.d.ts"/>
///<reference path="_def/types.d.ts"/>
///<reference types="leaflet" />
///<reference types="leaflet.awesome-markers" />

namespace App {

    interface IconsStorageObject {
        [name: string]: L.AwesomeMarkers.Icon;
    }

    export class MapController {

        private map: L.Map;

        private layers: L.Control.LayersObject;

        private icons: IconsStorageObject = {
            'star': L.AwesomeMarkers.icon({
                icon: 'star',
                markerColor: 'orange',
                prefix: 'fa',
                iconColor: 'black',
            }),
        };

        constructor(
            private id: string,
        ) {
            this.layers = {
                'Yandex Map': L.yandex(),
                'Yandex Satellite': L.yandex({
                    type: 'satellite'
                }),
                'OSM': new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }),
            };

            this.map = L.map(this.id, {
                center: [51.505, -0.09],
                zoom: 13,
                zoomAnimation: true
            });

            L.control.layers(this.layers).addTo(this.map);

            this.pointAdd({
                lat: 51.505,
                lon: -0.09,
                name: '123',
                icon: 'star'
            } as Type.Point)
        }

        public pointAdd(point: Type.Point) {
            let ll = new L.LatLng(point.lat, point.lon);

            let marker = new L.Marker(ll, {
                draggable: true,
                autoPan: true,
                icon: this.icons[point.icon],
            });

            marker.on('dragend', function() {
                if (!confirm('Save new position?')) {
                    marker.setLatLng(ll);
                } else {
                    ll = marker.getLatLng();
                    console.log(marker.getIcon());
                }
            });

            marker
                .addTo(this.map)
                .bindPopup(`<b>Hello world!</b><br />I am a ${point.name}.`);
        }

        /*
                public init() {


                    var popup = new L.Popup();

                    map.on('click', function(o: L.LeafletEvent) {
                        let e = o as L.LocationEvent;

                        popup
                            .setLatLng(ee.latlng)
                            .setContent("You clicked the map at " + ee.latlng.toString())
                            .openOn(map);
                    });
                }*/
    }
}
