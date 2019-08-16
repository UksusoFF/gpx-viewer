var L = require("leaflet");
require("leaflet.awesome-markers");
var MapController = (function () {
    function MapController(id) {
        this.id = id;
        this.icons = {
            'star': L.AwesomeMarkers.icon({
                icon: 'star',
                markerColor: 'orange',
                prefix: 'fa',
                iconColor: 'black',
            }),
        };
        this.layers = {
            //'Yandex Map': LP.yandex(),
            //'Yandex Satellite': LP.yandex({
            //    type: 'satellite'
            //}),
            'OSM': new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }),
        };
        this.map = L.map(this.id, {
            center: [51.505, -0.09],
            zoom: 13,
            zoomAnimation: true
        });
        L.control.layers(this.layers).addTo(this.map);
        this.pointAdd({
            lat: 51.505,
            lon: -0.09,
            name: '123',
            icon: 'star'
        }, as, Type.Point);
    }
    MapController.prototype.layerAdd = function (layer) {
        var g = new L.LayerGroup([
            layer
        ]);
        L.geoJSON(g.toGeoJSON(), {
            onEachFeature: function (e) {
                console.log(e);
            }
        });
        layer.addTo(this.map);
    };
    MapController.prototype.pointAdd = function (point) {
        var ll = new L.LatLng(point.lat, point.lon);
        var marker = new L.Marker(ll, {
            draggable: true,
            autoPan: true,
            icon: this.icons[point.icon],
        });
        marker.on('dragend', function () {
            if (!confirm('Save new position?')) {
                marker.setLatLng(ll);
            }
            else {
                ll = marker.getLatLng();
                console.log(marker.getIcon());
            }
        });
        marker
            .addTo(this.map)
            .bindPopup("<b>Hello world!</b><br />I am a " + point.name + ".");
    };
    return MapController;
})();
exports.MapController = MapController;
