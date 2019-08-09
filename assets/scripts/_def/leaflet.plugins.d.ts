import * as Leaflet from "leaflet";

declare global {
    namespace L {
        function yandex(options?: any): Leaflet.Layer;
    }
}