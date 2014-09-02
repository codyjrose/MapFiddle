app.factory('mapFeatureService', ['$rootScope', 'mapService', 'mapTypeService', function ($rootScope, mapService, mapTypeService) {
    "use strict";

    var activeMapType = mapTypeService.getActiveMapTypeName();

    $rootScope.$on('mapTypeChange', function(e, mapTypeName) {
        activeMapType = mapTypeName;
        setFeaturesByMapType();
        setDocsByMapType();
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
                            var zoom = mapService.getZoom();
                            var radius = 500000;

                            if (zoom !== 0) {
                                radius = radius / Math.pow(2, (zoom * 0.7));
                            }

                            return [ mapService.getLatLngInCurrentBounds(), radius, { color: 'red', fillColor: '#f03', fillOpacity: 0.5 } ];
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
                docs: [],
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
                        popupContent: "<b>Hello world</b><br>I'm a popup attached to a marker"
                    },
                    {
                        name: 'Circle',
                        obj: null,
                        infoWindow: null,
                        options: function () {

                            var zoom = mapService.getZoom();
                            var radius = 500000;

                            if (zoom !== 0) {
                                radius = radius / Math.pow(2, (zoom * 0.7));
                            }

                            return {
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#FF0000',
                                fillOpacity: 0.35,
                                map: mapService.getMap(),
                                center: mapService.getLatLngInCurrentBounds(),
                                radius: radius
                            };
                        },
                        popupEnabled: false,
                        popupContent: "<b>Hello world</b><br>I'm a popup attached to a circle"
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
                        popupContent: "<b>Hello world</b><br>I'm a popup attached to a polygon"
                    }
                ]
            }
        ];

    features.data = [];
    features.docs = [];

    /**
     * Sets features data by map type.
     */
    var setFeaturesByMapType = function() {
        var d = _.find(featuresByMapType, function (feature) { return feature.name === activeMapType; });
        features.data = d.data;
    };

    /**
     * Sets features doc list by map type.
     */
    var setDocsByMapType = function() {
        var d = _.find(featuresByMapType, function (feature) { return feature.name === activeMapType; });
        features.docs = d.docs;
    };

    var get = function (featureName) {
        try {
            return _.find(getAll(), { name: featureName });
        } catch (ignore) {}
    };

    var set = function (featureName, value) {
        // Set the value of the option
        get(featureName).value = value;
    };

    var getAll = function () {
        return features.data;
    };

    var getDocs = function () {
        return features.docs;
    };

    var getAllUsed = function () {
        return _.filter(getAll(), function (feature) { return feature.obj !== null; });
    };

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

    var featureEnabled = function(featureName) {
        return (get(featureName).obj);
    };

    setFeaturesByMapType();
    setDocsByMapType();

    return {
        set: set,
        setFeaturesByMapType: setFeaturesByMapType,
        get: get,
        getAll: getAll,
        getAllUsedPopups: getAllUsedPopups,
        getAllUsed: getAllUsed,
        getDocs: getDocs,
        featureEnabled: featureEnabled,
        broadcastChangedFeature: broadcastChangedFeature,
        broadcastChangedFeaturePopup: broadcastChangedFeaturePopup,
        lastUpdatedFeature: function() { return lastUpdatedFeature }
    };
}]);