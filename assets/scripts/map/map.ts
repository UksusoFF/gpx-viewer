/// <reference path="../@types/leaflet-control-geocoder.d.ts"/>
/// <reference path="../@types/leaflet-plugins.d.ts"/>
/// <reference path="../@types/leaflet-sidebar.d.ts"/>

import * as L from 'leaflet';

import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import 'leaflet-plugins/layer/tile/Yandex.js';
import 'leaflet-sidebar-v2/js/leaflet-sidebar.js';
import 'leaflet.awesome-markers';

import GPX from '../gpx/types/gpx';
import Icon from '../icon';
import MapPoint from './point';
import WayPoint from '../gpx/types/way_point';
import { bus, pointCreated, pointTargeted, pointUpdated } from '../events';
import { BusEvent } from 'ts-bus/types';

class MapController {
    private map: L.Map;

    private layers: L.Control.LayersObject;

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

        this.map.addControl((new L.Control.Geocoder({
            defaultMarkGeocode: false,
            position: 'topleft',
        })).on('markgeocode', (e: L.Control.GeocoderMarkEvent) => {
            this.map.fitBounds(e.geocode.bbox);
        }));

        L.control.sidebar({
            autopan: false,
            closeButton: false,
            container: 'sidebar',
            position: 'left',
        }).addTo(this.map);

        this.map.on('contextmenu', (e: L.LeafletMouseEvent) => {
            e.originalEvent.preventDefault();

            this.pointNew(e.latlng.lat, e.latlng.lng);
        });

        this.subscribe();
    }

    private subscribe(): void {
        bus.subscribe(pointUpdated, (e: BusEvent) => {
            this.refresh();
        });

        bus.subscribe(pointCreated, (e: BusEvent) => {
            this.refresh();
        });

        bus.subscribe(pointTargeted, (e: BusEvent) => {
            this.panTo(e.payload.point);
        });
    }

    public refresh(): void {
        this.map.eachLayer((layer: L.Layer) => {
            if (layer instanceof L.Marker) {
                layer.remove();
            }
        });

        this.storage.wpt.forEach((point: WayPoint): void => {
            this.pointAdd(point);
        });
    }

    public clear(): void {
        this.storage.wpt = [];

        this.map.eachLayer((layer: L.Layer) => {
            if (layer instanceof L.Marker) {
                layer.remove();
            }
        });
    }

    private pointNew(lat: number, lon: number): void {
        let point = new WayPoint({
            $: {
                lat: lat,
                lon: lon,
            },
            name: 'New point',
        });

        this.storage.wpt.push(point);

        this.pointAdd(point);

        bus.publish(pointCreated({
            point: point,
        }));
    }

    public pointAdd(point: WayPoint) {
        if (point.isDeleted) {
            return;
        }

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

        marker.on('dragend', () => {
            if (!confirm('Save new position?')) {
                marker.setLatLng(ll);
            } else {
                ll = marker.getLatLng();
            }

            point.$.lat = ll.lat;
            point.$.lon = ll.lng;
        });

        marker
            .addTo(this.map)
            .bindPopup((new MapPoint(point)).popup);
    }

    public panTo(point: WayPoint) {
        this.map.panTo(new L.LatLng(point.$.lat, point.$.lon));
    }
}

export default MapController;
