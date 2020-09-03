export default class Bounds {
    private minlat: any;

    private minlon: any;

    private maxlat: any;

    private maxlon: any;

    constructor(object: any) {
        this.minlat = object.minlat;
        this.minlon = object.minlon;
        this.maxlat = object.maxlat;
        this.maxlon = object.maxlon;
    }
}
