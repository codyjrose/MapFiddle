/**
 * Created by Cody on 3/15/14.
 * Service responsible for holding map options.
 */
app.factory('mapOptionsService', ['$rootScope', function($rootScope) {
    /**
     * Leaflet map options
     * @type {{zoom: {value: number, min: number, max: number, type: string, label: string, required: boolean, default: number, inputType: string}, center: {value: number[], type: string, label: string, required: boolean, default: number[], inputType: string}, layers: {value: *, type: string, required: boolean, inputType: string}}}
     */
    var lastUpdatedOption = {},
        leafletOsmOptions = {
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
            zoomControl: {
                value: true,
                type: "boolean",
                label: "Zoom Control",
                required: "false",
                default: true,
                inputType: "checkbox"
            },
            center: {
                value: [-34.397, 150.644],
                type: "array",
                label: "Map Center",
                required: true,
                default: [-34.397, 150.644],
                inputType: false
            },
            url: {
                value: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                type: "string",
                required: true,
                inputType: false
            },
            attribution: {
                value: "Map data © OpenStreetMap contributors",
                type: "string",
                required: true,
                inputType: false
            }
        },
        mapOptions = {};

        mapOptions.data = leafletOsmOptions;

    /**
     * Returns a map option value
     * @returns {object}
     */
    var get = function (option, key) {
        if (mapOptions.data.hasOwnProperty(option) && mapOptions.data[option].hasOwnProperty(key)) {
            return mapOptions.data[option][key];
        }

        return false;
    };

    /**
     * Returns all map options
     * @returns {object}
     */
    var getAll = function () {
        return mapOptions.data;
    };

    /**
     * Sets a value in the map options object
     * @param {string} key The map option to set.
     * @param {object} value the map options new value
     */
    var set = function(option, value) {
        if (mapOptions.data.hasOwnProperty(option)) {
            mapOptions.data[option].value = value;
        }
    };

    var getSidebarOptions = function() {
        return _.filter(mapOptions.data, function(opt) { return opt.inputType != false });
    };

    /**
     * Returns an options object that can be used in a maps creation.
     * @returns {object}
     */
    var getMapOptionsObject = function() {
        var optionsObject = {};
        angular.forEach(mapOptions.data, function(value, key) {
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


    var broadcastChangedItem = function(item) {
        lastUpdatedOption = item;
        $rootScope.$broadcast('mapOptionChange')
    };

    return {
        get: get,
        getAll: getAll,
        getSideBarOptions: getSidebarOptions,
        set: set,
        broadcastChangedItem: broadcastChangedItem,
        lastUpdatedOption: function() { return lastUpdatedOption },
        getMapOptionsObject: function() {
            return getMapOptionsObject();
        },
        getUsedMapOptionsObject: function() {
            return getUsedMapOptionsObject();
        }
    }
}]);


// Future Map Options
//{
//    "attribution": "Map data © OpenStreetMap contributors",
//    "attributionControl": true,
//    "bounceAtZoomLimits": true,
//    "boxZoom": true,
//    "center": Array[2],
//    "closePopupOnClick": true,
//    "crs": Object,
//    "doubleClickZoom": true,
//    "dragging": true,
//    "easeLinearity": 0.25,
//    "fadeAnimation": true,
//    "inertia": true,
//    "inertiaDeceleration": 3400,
//    "inertiaMaxSpeed": Infinity,
//    "inertiaThreshold": 18,
//    "keyboard": true,
//    "keyboardPanOffset": 80,
//    "keyboardZoomOffset": 1,
//    "markerZoomAnimation": true,
//    "scrollWheelZoom": true,
//    "tap": true,
//    "tapTolerance": 15,
//    "touchZoom": false,
//    "trackResize": true,
//    "url": "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//    "worldCopyJump": false,
//    "zoom": 8,
//    "zoomAnimation": true,
//    "zoomAnimationThreshold": 4,
//    "zoomControl": true
//}