import * as Leaflet from 'leaflet';

declare module 'leaflet' {

    function yandex(options?: any): Leaflet.Layer;

}
