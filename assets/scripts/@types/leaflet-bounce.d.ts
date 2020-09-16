import * as L from 'leaflet';

declare module 'leaflet' {

    interface BounceOptions {
        bounceHeight?: number;
        bounceSpeed?: number;
        exclusive?: boolean;
    }

    interface Marker {
        setBouncingOptions(options?: BounceOptions): this;

        isBouncing(): void;

        bounce(times?: number): void;

        stopBouncing(): void;

        toggleBouncing(): void;
    }
}
