app.factory('mapOptionsService', ['$rootScope', function ($rootScope) {
    "use strict";

    var lastUpdatedOption = {},     // Tracks the last updated option
        leafletOsmOptions = [
            {
                name: "zoomControl",
                value: true,
                updateMethod: "control",
                type: "boolean",
                label: "Zoom Control",
                tooltip: "Whether the zoom control is added to the map by default.",
                required: false,
                default: true,
                inputType: "checkbox"
            },
            {
                name: "attributionControl",
                value: true,
                updateMethod: "control",
                type: "boolean",
                label: "Attribution Control",
                tooltip: "Whether the attribution control is added to the map by default.",
                required: false,
                default: true,
                inputType: "checkbox"
            },
            {
                name: "center",
                value: [0,0],
                type: "array",
                updateMethod: "",
                label: "Set View",
                tooltip: "Initial geographical center of the map.",
                required: true,
                default: [51.505, -0.09],
                inputType: false,
                stateMethod: "getCenter"
            },
            {
                name: "zoom",
                value: 4,
                updateMethod: "",
                type: "number",
                label: "Set Zoom",
                tooltip: "Initial map zoom.",
                required: true,
                default: 13,
                inputType: false,
                stateMethod: "getZoom"
            },
            {
                name: "minZoom",
                label: "Minimum Zoom Level",
                tooltip: "Minimum zoom level of the map. Overrides any minZoom set on map layers.",
                value: 0,
                min: 0,
                max: 18,
                updateMethod: "propertyOfMapDotOptions",
                type: "number",
                required: false,
                default: 0,
                inputType: "range",
                stateMethod: "getMinZoom"

            },
            {
                name: "maxZoom",
                label: "Max Zoom Level",
                tooltip: "Maximum zoom level of the map. This overrides any maxZoom set on map layers.",
                value: 18,
                min: 0,
                max: 18,
                updateMethod: "propertyOfMapDotOptions",
                type: "number",
                required: false,
                default: 18,
                inputType: "range",
                stateMethod: "getMaxZoom"
            },
            {
                name: "dragging",
                value: true,
                type: "boolean",
                updateMethod: "mapProperty",
                label: "Dragging",
                tooltip: "Whether the map be draggable with mouse/touch or not.",
                required: false,
                default: true,
                inputType: "checkbox"
            },
            {
                name: "touchZoom",
                value: true,
                type: "boolean",
                updateMethod: "mapProperty",
                label: "Touch Zoom",
                tooltip: "Whether the map can be zoomed by touch-dragging with two fingers.",
                required: false,
                default: true,
                inputType: "checkbox"
            },
            {
                name: "scrollWheelZoom",
                value: true,
                type: "boolean",
                updateMethod: "mapProperty",
                label: "Scroll Wheel Zoom",
                tooltip: "Whether the map can be zoomed by using the mouse wheel. If passed 'center', it will zoom to the center of the view regardless of where the mouse was.",
                required: false,
                default: true,
                inputType: "checkbox"
            },
            {
                name: "doubleClickZoom",
                value: true,
                type: "boolean",
                updateMethod: "mapProperty",
                label: "Double Click Zoom",
                tooltip: "Whether the map can be zoomed in by double clicking on it and zoomed out by double clicking while holding shift. If passed 'center', double-click zoom will zoom to the center of the view regardless of where the mouse was.",
                required: false,
                default: true,
                inputType: "checkbox"
            },
            {
                name: "url",
                updateMethod: "",
                value: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                type: "string",
                required: true,
                inputType: false
            },
            {
                name: "attribution",
                updateMethod: "",
                value: "Map data © OpenStreetMap contributors",
                type: "string",
                required: true,
                inputType: false
            }
        ],  // The main store for all leaflet api options
        mapOptions = {};            // The object with the data property holds the actual map options

    mapOptions.data = leafletOsmOptions;

    /**
     * Returns all map options
     * @returns {object}
     */
    var getAll = function () {
        return mapOptions.data;
    };

    /**
     * Returns a map option value or false if no value is found.
     * @param optionName
     * @returns {*}
     */
    var get = function (optionName) {
        try {
            return _.find(getAll(), { name: optionName });
        } catch (ignore) {}
    };


    /**
     * Returns all map options that are required for map creation as well as any options that have been modified.
     * @returns {object}
     */
    var getAllModified = function () {
        return _.filter(getAll(), function (option) { return option.required || (option.value !== option.default); });
    };

    /**
     * Returns all map state options (e.g. zoom, center, minZoom, etc.)
     * @returns {object}
     */
    var getAllWithStateMethod = function () {
        return _.filter(getAll(), function (option) { return option.hasOwnProperty("stateMethod"); });
    };

    /**
     * Gets all options that are displayed to the user to configure.
     */
    var getUserConfigurable = function () {
        return _.filter(getAll(), function (opt) { return opt.inputType !== false; });
    };

    /**
     * Sets a value in the map options object. This is the one true way to set the value of map options.
     * @param {string} optionName The map option to set.
     * @param {object} value the map options new value.
     */
    var set = function (optionName, value) {
        // Modify the value if needed.
        if (value instanceof L.LatLng) {
            value = [value.lat, value.lng];
        }
        // Set the value of the option
        get(optionName).value = value;
    };

    /**
     * Send out broadcast of a changed option.
     * @param {string} optionName
     */
    var broadcastChangedOption = function (optionName) {
        lastUpdatedOption = get(optionName);
        $rootScope.$broadcast('mapOptionChange');
    };



    return {
        set: set,
        getAllModified: getAllModified,
        getUserConfigurable: getUserConfigurable,
        getAllWithStateMethod: getAllWithStateMethod,
        broadcastChangedOption: broadcastChangedOption,
        lastUpdatedOption: function () { return lastUpdatedOption; }
    };
}]);