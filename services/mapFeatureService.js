app.factory('mapFeatureService', ['$rootScope', 'mapService', function($rootScope, mapService) {

    var lastUpdatedFeature = {},
        features = {
            marker: {
                name: 'marker',
                obj: null,
                options: function () {
                    return [ mapService.getMapCenter() ];
                }
            },
            circle: {
                name: 'circle',
                obj: null,
                options: function() {
                    var radius = 500;

                    return [ mapService.getMapCenter(), radius, { color: 'red', fillColor: '#f03', fillOpacity: 0.5 } ]
                }
            },
            polygon: {
                name: 'polygon',
                obj: null,
                options: function () {
                    return [[ mapService.getMapCenter(), [51.503, -0.06], [51.51, -0.047] ]]
                }
            }
        };

    var get = function (feature) {
        if (features.hasOwnProperty(feature)) {
            return features[feature];
        }
        return false;
    };

    var getAll = function () {
        return features;
    };

    var getAllUsed = function () {
        return _.filter(getAll(), function(feature) { return feature.obj != null });
    };

    var broadcastChangedFeature = function(feature) {
        lastUpdatedFeature = get(feature);
        $rootScope.$broadcast('mapFeatureChange');
    };

    return {
        getAllUsed: getAllUsed,
        broadcastChangedFeature: broadcastChangedFeature,
        lastUpdatedFeature: function() { return lastUpdatedFeature }
    }
}]);