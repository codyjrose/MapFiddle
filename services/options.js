/**
 * Created by Cody on 3/15/14.
 * Service responsible for holding map options.
 */

mfApp.factory('mapOptionsService', function() {
    var googleMapOptions = {
        zoom: {
            value: 8,
            min: 1,
            max: 21,
            type: "number",
            label: "Zoom",
            required: true,
            default: 8,
            inputType: "range"
        },
        center: {
            value: new google.maps.LatLng(-34.397, 150.644),
            type: "object",
            typeText: "new google.maps.LatLng",
            label: "Map Center",
            required: true,
            default: new google.maps.LatLng(-34.397, 150.644),
            inputType: "none"
        },
        panControl: {
            value: true,
            type: "boolean",
            label: "Pan Control",
            default: true,
            inputType: "checkbox"
        },
        zoomControl: {
            value: true,
            type: "boolean",
            label: "Zoom Control",
            default: true,
            inputType: "checkbox"
        },
        streetViewControl: {
            value: true,
            type: "boolean",
            label: "Street View Control",
            default: true,
            inputType: "checkbox"
        },
        mapTypeControl: {
            value: true,
            type: "boolean",
            label: "Map Type Control",
            default: true,
            inputType: "checkbox"
        }
    };

    var leafletOsmOptions = {
        zoom: {
            value: 8,
            min: 1,
            max: 21,
            type: "number",
            label: "Zoom",
            required: true,
            default: 8,
            inputType: "range"
        },
        center: {
            value: [-34.397, 150.644],
            type: "array",
            label: "Map Center",
            required: true,
            default: [-34.397, 150.644],
            inputType: "none"
        },
        layers: {
            value: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Map data © OpenStreetMap contributors' }),
            type: "object",
            required: true,
            inputType: "none"
        }
    };

    var getOptions = function(mapType) {
        return mapType == "leaflet" ? leafletOsmOptions : googleMapOptions;
    };

    var getUsedMapOptionsObject = function(options) {
        return Enumerable.From(options).Where(function(o) { return o.Value.value != o.Value.default || o.Value.required == true }).ToArray()
    };

    // Returns an options object for map creation.
    var getMapOptionsObject = function(options) {
        var mapOptions = {};
        angular.forEach(options, function(value, key) {
            if (value.type == "number") {
                mapOptions[key] = parseInt(value.value);
            } else {
                mapOptions[key] = value.value;
            }
        });
        return mapOptions;
    }

    return {
        getOptions: function(mapType) {
            return getOptions(mapType);
        },
        getUsedMapOptionsObject: function(options) {
            return getUsedMapOptionsObject(options);
        },
        getMapOptionsObject: function(options) {
            return getMapOptionsObject(options);
        }
    }
});