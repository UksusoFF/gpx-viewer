export default class Copyright {
    private author: any;
    private year: any;
    private license: any;

    constructor(object: any) {
        this.author = object.author;
        this.year = object.year;
        this.license = object.license;
    }
}
