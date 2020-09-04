/// <reference path="../@types/leaflet-plugins.d.ts"/>

import * as L from 'leaflet';

import 'leaflet-plugins/layer/tile/Yandex.js';
import 'leaflet.awesome-markers';

import Icon from '../icon';
import MapPopup from './popup';
import WayPoint from '../gpx/types/way_point';

class MapController {
    private map: L.Map;

    private layers: L.Control.LayersObject;

    constructor(
        private container: HTMLElement,
    ) {
        this.layers = {
            'Yandex Map': new L.Yandex('map'),
            'Yandex Satellite': new L.Yandex('satellite'),
            'OSM': new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }),
        };

        this.map = L.map(this.container, {
            center: [
                53.2001,
                50.15,
            ],
            zoom: 13,
            zoomAnimation: true,
        });

        L.control.layers(this.layers).addTo(this.map);
    }

    public layerAdd(layer: L.Layer) {
        let g = new L.LayerGroup([
            layer,
        ]);

        L.geoJSON(g.toGeoJSON(), {
            onEachFeature: (e: any) => {
                console.log(e);
            },
        });

        layer.addTo(this.map);
    }

    public pointAdd(point: WayPoint) {
        let ll = new L.LatLng(point.$.lat, point.$.lon);

        let marker = new L.Marker(ll, {
            draggable: true,
            autoPan: true,
            icon: L.AwesomeMarkers.icon({
                icon: Icon.getIcon(point.extensions?.icon ?? null),
                markerColor: 'orange',
                prefix: 'mdi',
                iconColor: 'black',
            }),
        });

        marker.on('dragend', function() {
            if (!confirm('Save new position?')) {
                point.$.lat = ll.lat;
                point.$.lon = ll.lng;
                marker.setLatLng(ll);
            } else {
                ll = marker.getLatLng();
                console.log(marker.getIcon());
            }
        });

        marker
            .addTo(this.map)
            .bindPopup((new MapPopup(point)).popup);
    }
}

export default MapController;
