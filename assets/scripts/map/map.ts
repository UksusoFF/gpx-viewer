/// <reference path="../@types/leaflet-plugins.d.ts"/>

import * as L from 'leaflet';
import { LeafletMouseEvent, Map } from 'leaflet';

import 'leaflet-plugins/layer/tile/Yandex.js';
import 'leaflet.awesome-markers';

import Icon from '../icon';
import MapPopup from './popup';
import WayPoint from '../gpx/types/way_point';
import GPX from "../gpx/types/gpx";

class MapController {
    private map: L.Map;

    private layers: L.Control.LayersObject;

    public pointUpdated: () => void = () => {};

    constructor(
        private container: HTMLElement,
        private storage: GPX
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
            layers: [
                this.layers['OSM'],
            ],
        });

        L.control.layers(this.layers).addTo(this.map);

        this.map.on('contextmenu', (e: LeafletMouseEvent) => {
            e.originalEvent.preventDefault();

            this.pointNew(e.latlng.lat, e.latlng.lng)
        });
    }

    public refresh(): void {
        this.map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                layer.remove();
            }
        })

        this.storage.wpt.forEach((point: WayPoint): void => {
            this.pointAdd(point);
        });
    }

    public clear(): void {
        this.storage.wpt = [];

        this.map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                layer.remove();
            }
        })
    }

    private pointNew(lat: number, lon: number): void {
        let point = {
            $: {
                lat: lat,
                lon: lon
            },
            name: 'New point'
        } as WayPoint;

        this.storage.wpt.push(point);

        this.pointAdd(point);

        this.pointUpdated();
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
            }
        });

        marker
            .addTo(this.map)
            .bindPopup((new MapPopup(point, this.pointUpdated)).popup);
    }

    public panTo(point: WayPoint) {
        this.map.panTo(new L.LatLng(point.$.lat, point.$.lon));
    }
}

export default MapController;
