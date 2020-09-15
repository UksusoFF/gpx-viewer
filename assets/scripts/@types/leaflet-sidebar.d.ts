import * as L from 'leaflet';

declare module 'leaflet' {

    interface SidebarOptions {
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
        function sidebar(options?: SidebarOptions): SidebarControl;
    }
}
