/**
 * Created by Cody on 3/15/14.
 * Service responsible for holding map options.
 */

//mfApp.service('mapOptionsService', function() {
//    // Google map options
//    var googleMapOptionsJson = {
//        zoom: {
//            value: 8,
//            min: 1,
//            max: 21,
//            type: "number",
//            label: "Zoom",
//            required: true,
//            default: 8,
//            inputType: "range"
//        },
//        center: {
//            value: new google.maps.LatLng(-34.397, 150.644),
//            type: "object",
//            typeText: "new google.maps.LatLng",
//            label: "Map Center",
//            required: true,
//            default: new google.maps.LatLng(-34.397, 150.644),
//            inputType: "none"
//        },
//        panControl: {
//            value: true,
//            type: "boolean",
//            label: "Pan Control",
//            default: true,
//            inputType: "checkbox"
//        },
//        zoomControl: {
//            value: true,
//            type: "boolean",
//            label: "Zoom Control",
//            default: true,
//            inputType: "checkbox"
//        },
//        streetViewControl: {
//            value: true,
//            type: "boolean",
//            label: "Street View Control",
//            default: true,
//            inputType: "checkbox"
//        },
//        mapTypeControl: {
//            value: true,
//            type: "boolean",
//            label: "Map Type Control",
//            default: true,
//            inputType: "checkbox"
//        }
//    };
//
//    // Leaflet map options
//    var leafletOsmOptionsJson = {
//        zoom: {
//            value: 8,
//            min: 1,
//            max: 21,
//            type: "number",
//            label: "Zoom",
//            required: true,
//            default: 8,
//            inputType: "range"
//        },
//        center: {
//            value: [-34.397, 150.644],
//            type: "array",
//            label: "Map Center",
//            required: true,
//            default: [-34.397, 150.644],
//            inputType: "none"
//        },
//        layers: {
//            value: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Map data © OpenStreetMap contributors' }),
//            type: "object",
//            required: true,
//            inputType: "none"
//        }
//    };
//
//    // The set of map options that are currently being used.
//    this.mapOptions = googleMapOptionsJson; // TODO this should probably be moved out to an init function of some kind.;
//
//    // Provides map option data for populating the sidebar
//    var getDefaultMapOptions = function(mapType) {
//
//        return mapType.codename == "google" ? googleMapOptionsJson : leafletOsmOptionsJson; // TODO this should probably be moved out to an init function of some kind.;
//    };
//
//    // Returns an options object that can be used in a maps creation.
//    var getMapOptionsObject = function() {
//        var optionsObject = {};
//        angular.forEach(mapOptions, function(value, key) {
//            if (value.type == "number") {
//                optionsObject[key] = parseInt(value.value);
//            } else {
//                optionsObject[key] = value.value;
//            }
//        });
//        return optionsObject;
//    };
//
//    // Returns an options object that can be used in a maps creation.
//    var getUsedMapOptionsObject = function() {
//        return Enumerable.From(mapOptions).Where(function(o) { return o.Value.value != o.Value.default || o.Value.required == true }).ToArray()
//    };
//
//    // Public functions
//    this.getDefaultMapOptions = function(mapType) {
//        return getDefaultMapOptions(mapType);
//    };
//    this.getMapOptionsObject = function() {
//        return getMapOptionsObject();
//    };
//    this.getUsedMapOptionsObject = function(options) {
//        return getUsedMapOptionsObject(options);
//    };
//
//    this.getMapOptions = function() {
//        return mapOptions;
//    }
//});

mfApp.factory('mapOptionsService', function() {
    // Google map options
    var googleMapOptionsJson = {
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

    // Leaflet map options
    var leafletOsmOptionsJson = {
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

    // Init service
    var mapOptions = googleMapOptionsJson;

            //mapType.codename == "google" ? googleMapOptionsJson : leafletOsmOptionsJson; // TODO this should probably be moved out to an init function of some kind.

    // Provides map option data for populating the sidebar
    var getDefaultMapOptions = function(mapType) {
        return mapOptions
    };

    // Returns an options object that can be used in a maps creation.
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

    // Returns an options object that can be used in a maps creation.
    var getUsedMapOptionsObject = function() {
        return Enumerable.From(mapOptions).Where(function(o) { return o.Value.value != o.Value.default || o.Value.required == true }).ToArray()
    };

    return {
        getDefaultMapOptions: function(mapType) {
            return getDefaultMapOptions(mapType);
        },
        getMapOptionsObject: function() {
            return getMapOptionsObject();
        },
        getUsedMapOptionsObject: function(options) {
            return getUsedMapOptionsObject(options);
        },
        googleMapOptionsJson: {
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
        }
    }
});