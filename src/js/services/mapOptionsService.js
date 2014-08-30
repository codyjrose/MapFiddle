app.factory('mapOptionsService', ['$rootScope', 'mapTypeService', function ($rootScope, mapTypeService) {
    "use strict";

    var activeMapType = mapTypeService.getActiveMapTypeName();

    $rootScope.$on('mapTypeChange', function(e, mapTypeName) {
        activeMapType = mapTypeName;
        setOptionsByMapType();
        setDocsByMapType();
    });

    var lastUpdatedOption = {},     // Tracks the last updated option
        optionsByMapType = [
            {
                name: "OSM",
                docs: [
                    {
                        text: "Map options",
                        url: "//leafletjs.com/reference.html#map-options"
                    }
                ],
                data: [
                    {
                        name: "zoomControl",
                        value: true,
                        updateMethod: "control",
                        type: "boolean",
                        label: "Zoom Control",
                        tooltip: "Whether the zoom control is added to the map.",
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
                        tooltip: "Whether the attribution control is added to the map.",
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
                        default: [0,0],
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
                        default: 4,
                        inputType: false,
                        stateMethod: "getZoom"
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
                ]
            },
            {
                name: "GM",
                data: [
                    {
                        name: "panControl",
                        value: true,
                        updateMethod: "setOption",
                        type: "boolean",
                        label: "Pan Control",
                        tooltip: "Whether the pan control is added to the map.",
                        required: false,
                        default: true,
                        inputType: "checkbox"
                    },
                    {
                        name: "streetViewControl",
                        value: true,
                        type: "boolean",
                        updateMethod: "setOption",
                        label: "Street View Pegman",
                        tooltip: "The enabled/disabled state of the Street View Pegman control.",
                        required: false,
                        default: true,
                        inputType: "checkbox"
                    },
                    {
                        name: "zoomControl",
                        value: true,
                        updateMethod: "setOption",
                        type: "boolean",
                        label: "Zoom Control",
                        tooltip: "Whether the zoom control is added to the map.",
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
                        default: [0,0],
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
                        default: 4,
                        inputType: false,
                        stateMethod: "getZoom"
                    },
                    {
                        name: "draggable",
                        value: true,
                        type: "boolean",
                        updateMethod: "setOption",
                        label: "Dragging",
                        tooltip: "Whether the map be draggable with mouse/touch or not.",
                        required: false,
                        default: true,
                        inputType: "checkbox"
                    },
                    {
                        name: "mapTypeControl",
                        value: true,
                        type: "boolean",
                        updateMethod: "setOption",
                        label: "Map Type Control",
                        tooltip: "The enabled/disabled state of the Map type control.",
                        required: false,
                        default: true,
                        inputType: "checkbox"
                    },
                    {
                        name: "mapTypeControlOptions",
                        value: {
                            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                            position: google.maps.ControlPosition.TOP_LEFT
                        },
                        type: "object",
                        updateMethod: "",
                        label: "Map Type Control",
                        tooltip: "The enabled/disabled state of the Map type control.",
                        required: false,
                        default: true,
                        inputType: ""
                    }
                ]
            }
        ],
        options = {};            // The object with the data property holds the actual map options

    options.data = [];
    options.docs = [];

//    mapTypeControlOptions: {
//        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
//            position: google.maps.ControlPosition.BOTTOM_CENTER
//    }
    /**
     * Returns all map options
     * @returns {object}
     */
    var getAll = function () {
        return options.data;
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
        return _.filter(getAll(), function (option) {
            return option.required || (option.value !== option.default);
        });
    };

    /**
     * Returns all map state options (e.g. zoom, center, minZoom, etc.)
     * @returns {object}
     */
    var getAllWithStateMethod = function () {
        return _.filter(getAll(), function (option) {
            return option.hasOwnProperty("stateMethod");
        });
    };

    /**
     * Gets all options that are displayed to the user to configure.
     */
    var getUserConfigurable = function () {
        return _.filter(getAll(), function (opt) { return opt.inputType !== false; });
    };

    var getDocs = function () {
        return options.docs;
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
     * Sets the mapOptions data by map type name.
     */
    var setOptionsByMapType = function() {
        var d = _.find(optionsByMapType, function (option) { return option.name === activeMapType; });
        options.data = d.data;

        broadcastChangedMapTypeOptions();
    };

    /**
     * Sets options doc list by map type.
     */
    var setDocsByMapType = function() {
        var d = _.find(optionsByMapType, function (feature) { return feature.name === activeMapType; });
        options.docs = d.docs;
    };

    /**
     * Send out broadcast of a changed option.
     * @param {string} optionName
     */
    var broadcastChangedOption = function (optionName) {
        lastUpdatedOption = get(optionName);
        $rootScope.$broadcast('mapOptionChange');
    };

    /**
     * Send out broadcast that a
     */
    var broadcastChangedMapTypeOptions = function () {
        $rootScope.$broadcast('mapTypeOptionsChange');
    };

    // Init map options to OSM
    setOptionsByMapType();
    setDocsByMapType();

    return {
        get:get,
        set: set,
        getDocs: getDocs,
        //setOptionsByMapType: setOptionsByMapType,
        getAllModified: getAllModified,
        getUserConfigurable: getUserConfigurable,
        getAllWithStateMethod: getAllWithStateMethod,
        broadcastChangedOption: broadcastChangedOption,
        broadcastChangedMapTypeOptions: broadcastChangedMapTypeOptions,
        lastUpdatedOption: function () { return lastUpdatedOption; }
    };
}]);