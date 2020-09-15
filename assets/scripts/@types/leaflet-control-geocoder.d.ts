import * as L from 'leaflet';

declare module 'leaflet' {

    namespace Control {
        interface GeocoderOptions extends L.ControlOptions {
            collapsed?: boolean
            expand?: 'touch' | 'click' | 'hover'
            placeholder?: string
            errorMessage?: string
            iconLabel?: string
            geocoder?: object
            showUniqueResult?: boolean
            showResultIcons?: boolean
            suggestMinLength?: number
            suggestTimeout?: number
            query?: string
            queryMinLength?: number
            defaultMarkGeocode?: boolean
        }

        interface GeocoderMarkEvent {
            geocode: {
                bbox: L.LatLngBounds;
                center: L.LatLng;
                html: string;
                name: string;
            }
            target: L.Control.Geocoder;
            type: string;
        }

        class Geocoder extends L.Control {
            constructor(options?: GeocoderOptions);

            on(type: 'markgeocode', fn: (event: GeocoderMarkEvent) => void): this;
        }
    }
}
