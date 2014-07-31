app.factory('mapDataService', ['$rootScope', 'mapService', function($rootScope, mapService) {

    var features = {
        marker: {
            name: 'marker',
            obj: null,
            options: function () {
                var center = mapService.getMap().getCenter();
                return [ [ center.lat, center.lng ] ]
            }
        },
        circle: {
            name: 'circle',
            obj: null,
            options: function() {
                var center = mapService.getMap().getCenter();
                var radius = 500;

                return [ [ center.lat, center.lng ], radius, { color: 'red', fillColor: '#f03', fillOpacity: 0.5 } ]
            }
        },
        polygon: {
            name: 'polygon',
            obj: null,
            options: function () {
                var center = mapService.getMap().getCenter();

                return [[ [ center.lat, center.lng ], [51.503, -0.06], [51.51, -0.047] ]]
            }
        }
    };

    var addFeature = function(feature) {
        feature.obj = L[feature.name]
            .apply(null, feature.options())
            .addTo(mapService.getMap());
    };

    var removeFeature = function(feature) {
        mapService.getMap().removeLayer(feature.obj);
        feature.obj = null;
    };

    var toggleFeature = function(featureType) {
        var feature = features[featureType];

        if (feature.obj) {
            removeFeature(feature);
        }  else {
            addFeature(feature);
        }
    };

    return {
        toggleFeature: toggleFeature
    }
}]);