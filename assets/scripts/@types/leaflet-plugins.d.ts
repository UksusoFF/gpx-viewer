import * as L from 'leaflet';

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

    interface SidebarOption {
        autopan?: boolean,
        closeButton?: boolean,
        container?: string | HTMLElement,
        position?: 'left' | 'right',
    }

    class SidebarControl extends L.Control {
        close(): void;

        open(tab: string): void;
    }

    namespace control {
        function sidebar(options?: SidebarOption): SidebarControl;
    }
}
