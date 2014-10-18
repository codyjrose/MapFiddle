app.factory('mapFeatureService', ['$rootScope', 'mapService', 'mapTypeService', function ($rootScope, mapService, mapTypeService) {
    "use strict";

    var activeMapType = mapTypeService.getActiveMapTypeName();

    $rootScope.$on('mapTypeChange', function(e, mapTypeName) {
        activeMapType = mapTypeName;
        setFeaturesByMapType();
    });

    var lastUpdatedFeature = {},
        features = {},
        featuresByMapType = [
            {
                name: "OSM",
                docs: [
                    {
                        text: "Markers",
                        url: "//leafletjs.com/reference.html#marker"
                    },
                    {
                        text: "Circles",
                        url: "//leafletjs.com/reference.html#circle"
                    },
                    {
                        text: "Polygons",
                        url: "//leafletjs.com/reference.html#polygon"
                    }
                ],
                data: [
                    {
                        name: 'marker',
                        obj: null,
                        options: function () {
                            return [ mapService.getMapCenter() ];
                        },
                        popupEnabled: false,
                        popupContent: "<b>Hello world</b><br>I'm a popup attached to a marker"
                    },
                    {
                        name: 'circle',
                        obj: null,
                        options: function () {
                            return [ mapService.getLatLngInCurrentBounds(), getCircleRadius(), { color: 'red', fillColor: '#f03', fillOpacity: 0.5 } ];
                        },
                        popupEnabled: false,
                        popupContent: "<b>Hello world</b><br>I'm a popup attached to a circle"
                    },
                    {
                        name: 'polygon',
                        obj: null,
                        options: function () {
                            var exteriorRing = mapService.getLatLngInCurrentBounds();
                            var hole1 = mapService.getLatLngInCurrentBounds();
                            var hole2 = mapService.getLatLngInCurrentBounds();

                            return [[ exteriorRing, hole1, hole2 ]];
                        },
                        popupEnabled: false,
                        popupContent: "<b>Hello world</b><br>I'm a popup attached to a polygon"
                    }
                ]
            },
            {
                name: "GM",
                docs: [
                    {
                        text: "Markers",
                        url: "https://developers.google.com/maps/documentation/javascript/markers"
                    },
                    {
                        text: "Shapes",
                        url: "https://developers.google.com/maps/documentation/javascript/shapes"
                    }
                ],
                data: [
                    {
                        name: 'Marker',
                        obj: null,
                        infoWindow: null,
                        options: function () {
                            return {
                                position: mapService.getMapCenter(),
                                map: mapService.getMap(),
                                title: 'Hello, world'
                            };
                        },
                        popupEnabled: false,
                        popupContent: "<b>Hello world</b><br>I'm a popup attached to a marker",
                        outputObject: function() {
                            return "{\n" +
                                   "    position: new google.maps.LatLng" + mapService.getMapCenter() + ",\n" +
                                   "    map: map, \n" +
                                   "    title: \'Hello, world\'\n" +
                                   "  }"
                        }
                    },
                    {
                        name: 'Circle',
                        obj: null,
                        infoWindow: null,
                        options: function () {
                            return {
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#FF0000',
                                fillOpacity: 0.35,
                                map: mapService.getMap(),
                                center: mapService.getLatLngInCurrentBounds(),
                                radius: getCircleRadius()
                            };
                        },
                        popupEnabled: false,
                        popupContent: "<b>Hello world</b><br>I'm a popup attached to a circle",
                        outputObject: function() {
                            return "{\n" +
                            "    strokeColor: '#FF0000',\n" +
                            "    strokeOpacity: 0.8,\n" +
                            "    strokeWeight: 2,\n" +
                            "    fillColor: '#FF0000',\n" +
                            "    fillOpacity: 0.35,\n" +
                            "    map: map,\n" +
                            "    center: new google.maps.LatLng" + mapService.getLatLngInCurrentBounds() +",\n" +
                            "    radius: " + getCircleRadius() + "\n" +
                            "  }"
                        }
                    },
                    {
                        name: 'Polygon',
                        obj: null,
                        infoWindow: null,
                        options: function () {
                            var p1 = mapService.getLatLngInCurrentBounds();
                            var p2 = mapService.getLatLngInCurrentBounds();
                            var p3 = mapService.getLatLngInCurrentBounds();

                            return {
                                paths: [p1, p2, p3],
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#FF0000',
                                fillOpacity: 0.35,
                                map: mapService.getMap()
                            };
                        },
                        popupEnabled: false,
                        popupContent: "<b>Hello world</b><br>I'm a popup attached to a polygon",
                        outputObject: function() {
                            return "{\n" +
                                "    paths: [new google.maps.LatLng" + mapService.getLatLngInCurrentBounds() + ",\n" +
                                "            new google.maps.LatLng" + mapService.getLatLngInCurrentBounds() + ",\n" +
                                "            new google.maps.LatLng" + mapService.getLatLngInCurrentBounds() + "],\n" +
                                "    strokeColor: '#FF0000',\n" +
                                "    strokeOpacity: 0.8,\n" +
                                "    strokeWeight: 2,\n" +
                                "    fillColor: '#FF0000',\n" +
                                "    fillOpacity: 0.35,\n" +
                                "    map: map\n" +
                                "  }"
                        }
                    }
                ]
            }
        ];

    features.data = [];
    features.docs = [];

    /**
     * Sets features data by map type
     */
    var setFeaturesByMapType = function() {
        var d = _.find(featuresByMapType, function (feature) { return feature.name === activeMapType; });
        features.data = d.data;
        features.docs = d.docs;
    };

    /**
     * Get feature object by name
     * @param featureName
     * @returns {object}
     */
    var get = function (featureName) {
        try {
            return _.find(getAll(), { name: featureName });
        } catch (ignore) {}
    };

    /**
     * Set feature.value property
     * @param featureName
     * @param value
     */
    var set = function (featureName, value) {
        // Set the value of the option
        get(featureName).value = value;
    };

    /**
     * Get array of feature objects
     * @returns {Array}
     */
    var getAll = function () {
        return features.data;
    };

    /**
     * Get array of documentation objects
     * @returns {Array}
     */
    var getDocs = function () {
        return features.docs;
    };

    /**
     * Get array of all currently active feature objects
     * @returns {Array}
     */
    var getAllUsed = function () {
        return _.filter(getAll(), function (feature) { return feature.obj !== null; });
    };

    /**
     * Get array of all feature objects that have popups enabled
     * @returns {Array}
     */
    var getAllUsedPopups = function () {
        return _.filter(getAll(), function (feature) { return feature.popupEnabled; });
    };

    var broadcastChangedFeature = function (featureName) {
        lastUpdatedFeature = get(featureName);
        $rootScope.$broadcast('mapFeatureChange');
    };

    var broadcastChangedFeaturePopup = function (featureName) {
        lastUpdatedFeature = get(featureName);
        $rootScope.$broadcast('mapFeaturePopupChange');
    };

    /**
     * Get a radius based on zoom level. Used to create circle features
     * @returns {number}
     */
    var getCircleRadius = function() {
        var zoom = mapService.getZoom();
        var radius = 500000;

        if (zoom !== 0) {
            radius = radius / Math.pow(2, (zoom * 0.7));
        }

        return radius;
    };

    // Init features
    setFeaturesByMapType();

    return {
        set: set,
        get: get,
        getAll: getAll,
        getAllUsedPopups: getAllUsedPopups,
        getAllUsed: getAllUsed,
        getDocs: getDocs,
        broadcastChangedFeature: broadcastChangedFeature,
        broadcastChangedFeaturePopup: broadcastChangedFeaturePopup,
        lastUpdatedFeature: function() { return lastUpdatedFeature }
    };
}]);