/**
 * Created by Cody on 3/15/14.
 * Service responsible for holding map options.
 */
mfApp.factory('mapOptionsService', function() {
    /**
     * Currently used map options. This is the one true source of map options currently being used.
     */
    var mapOptions;

    /**
     * Google map options
     * @type {{zoom: {value: number, min: number, max: number, type: string, label: string, required: boolean, default: number, inputType: string}, center: {value: google.maps.LatLng, type: string, typeText: string, label: string, required: boolean, default: google.maps.LatLng, inputType: string}, panControl: {value: boolean, type: string, label: string, default: boolean, inputType: string}, zoomControl: {value: boolean, type: string, label: string, default: boolean, inputType: string}, streetViewControl: {value: boolean, type: string, label: string, default: boolean, inputType: string}, mapTypeControl: {value: boolean, type: string, label: string, default: boolean, inputType: string}}}
     */
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

    /**
     * Leaflet map options
     * @type {{zoom: {value: number, min: number, max: number, type: string, label: string, required: boolean, default: number, inputType: string}, center: {value: number[], type: string, label: string, required: boolean, default: number[], inputType: string}, layers: {value: *, type: string, required: boolean, inputType: string}}}
     */
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

    /**
     * Returns all map options
     * @returns {object}
     */
    var get = function () {
        if (!mapOptions) {
            mapOptions = googleMapOptions;
        }
        return mapOptions;
    };

    /**
     * Sets a value in the map options object
     * @param {string} key The map option to set.
     * @param {object} value the map options new value
     */
    var set = function(key, value) {
        mapOptions[key].value = value;
    };

    /**
     * Returns an options object that can be used in a maps creation.
     * @returns {object}
     */
    var getMapOptionsObject = function() {
        var optionsObject = {};
        angular.forEach(mapOptions, function(value, key) {
            if (value.type == "number") {
                optionsObject[key] = parseInt(value.value);
            } else {
                optionsObject[key] = value.value;
            }
        });
        return optionsObject;
    };

    /**
     * Returns all options that have been modified via the UI in an object that can be used in a maps creation.
     * @returns {object}
     */
    var getUsedMapOptionsObject = function() {
        return Enumerable.From(mapOptions).Where(function(o) { return o.Value.value != o.Value.default || o.Value.required == true }).ToArray()
    };

    return {
        get: function() {
            return get();
        },
        set: function(key, value) {
            set(key, value);
        },
        getMapOptionsObject: function() {
            return getMapOptionsObject();
        },
        getUsedMapOptionsObject: function() {
            return getUsedMapOptionsObject();
        }
    }
});