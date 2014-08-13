app.factory('mapFeatureService', ['$rootScope', 'mapService', function ($rootScope, mapService) {
    "use strict";

    var lastUpdatedFeature = {},
        features = {};

    features.data = [
        {
            name: 'marker',
            obj: null,
            options: function () {
                return [ mapService.getMapCenter() ];
            },
            popupEnabled: false
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
            popupEnabled: false
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
            popupEnabled: false
        }
    ];

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

    return {
        set: set,
        get: get,
        getAll: getAll,
        getAllUsedPopups: getAllUsedPopups,
        getAllUsed: getAllUsed,
        featureEnabled: featureEnabled,
        broadcastChangedFeature: broadcastChangedFeature,
        broadcastChangedFeaturePopup: broadcastChangedFeaturePopup,
        lastUpdatedFeature: function() { return lastUpdatedFeature }
    };
}]);