import * as L from 'leaflet'

declare module 'leaflet' {

    type YandexMap = 'map' | 'satellite' | 'hybrid' | 'publicMap' | 'publicMapHybrid'

    interface YandexOptions extends L.LayerOptions {
        minZoom?: number;
        maxZoom?: number;
        attribution?: string;
        opacity?: number;
        traffic?: boolean;
    }

    class Yandex extends L.Layer {
        constructor(type?: YandexMap, options?: YandexOptions);
    }
}
