import * as Leaflet from "leaflet";

declare global {

    let omnivore: {
        gpx: {
            parse(string: string): Leaflet.Layer,
        },
    };

    namespace L {
        function yandex(options?: any): Leaflet.Layer;
    }

}