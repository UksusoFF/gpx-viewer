import * as Leaflet from "leaflet";

declare global {
    namespace L {
        function yandex(): Leaflet.Layer;
    }
}