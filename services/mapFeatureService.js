app.factory('mapFeatureService', ['$rootScope', 'mapService', function($rootScope, mapService) {

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
            options: function() {
                var radius = 500;

                return [ mapService.getMapCenter(), radius, { color: 'red', fillColor: '#f03', fillOpacity: 0.5 } ]
            },
            popupEnabled: false
        },
        {
            name: 'polygon',
            obj: null,
            options: function () {
                return [[ mapService.getMapCenter(), [51.503, -0.06], [51.51, -0.047] ]]
            },
            popupEnabled: false
        }
    ];

    var set = function(featureName, value) {
        // Set the value of the option
        get(featureName).value = value;
    };

    var get = function (featureName) {
        try {
            return _.find(getAll(), { name: featureName });
        } catch (e) {}
    };

    var getAll = function () {
        return features.data;
    };

    var getAllUsed = function () {
        return _.filter(getAll(), function(feature) { return feature.obj != null });
    };

    var broadcastChangedFeature = function(featureName) {
        lastUpdatedFeature = get(featureName);
        $rootScope.$broadcast('mapFeatureChange');
    };

    var broadcastChangedFeaturePopup = function(featureName) {
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
        getAllUsed: getAllUsed,
        featureEnabled: featureEnabled,
        broadcastChangedFeature: broadcastChangedFeature,
        broadcastChangedFeaturePopup: broadcastChangedFeaturePopup,
        lastUpdatedFeature: function() { return lastUpdatedFeature }
    }
}]);