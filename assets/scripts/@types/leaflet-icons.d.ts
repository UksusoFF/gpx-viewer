import * as Leaflet from "leaflet";

declare module 'leaflet' {
    namespace IconMaterial {

        interface IconMaterialIconOptions extends BaseIconOptions {
            /**
             * Name of the icon. See glyphicons or font-awesome.
             */
            icon: string;

            /**
             * Color of the marker
             */
            markerColor?: 'red' | 'darkred' | 'orange' | 'green' | 'darkgreen' | 'blue' | 'purple' | 'darkpurple' | 'cadetblue';

            /**
             * Color of the icon. 'white', 'black' or css code (hex, rgba etc).
             */
            iconColor?: 'white' | 'black' | string;
        }

        function icon(options: IconMaterialIconOptions): Icon;

        class Icon extends Leaflet.Icon<IconMaterialIconOptions> {
            constructor(options?: IconMaterialIconOptions);
        }
    }
}
