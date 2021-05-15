import * as L from 'leaflet';

declare module 'leaflet' {

    namespace AwesomeMarkers {

        interface AwesomeMarkersIconOptions extends L.BaseIconOptions {
            icon?: string;
            prefix?: 'fa' | 'glyphicon' | 'mdi';
            markerColor?: 'red' | 'darkred' | 'orange' | 'green' | 'darkgreen' | 'blue' | 'purple' | 'darkpurple' | 'cadetblue';
            iconColor?: 'white' | 'black' | string;
            extraClasses?: string;
        }

        function icon(options: AwesomeMarkersIconOptions): Icon;

        class Icon extends L.Icon<AwesomeMarkersIconOptions> {
            constructor(options?: AwesomeMarkersIconOptions);
        }
    }
}
