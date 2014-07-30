app.controller('OptionsDataController', ['$scope', 'mapService', function($scope, mapService) {

    var features = {
        marker: {
            name: 'marker',
            obj: null,
            options: [ [51.5, -0.09] ]
        },
        circle: {
            name: 'circle',
            obj: null,
            options: [ [51.508, -0.11], 500, { color: 'red', fillColor: '#f03', fillOpacity: 0.5 } ]
        },
        polygon: {
            name: 'polygon',
            obj: null,
            options: [[ [51.509, -0.08], [51.503, -0.06], [51.51, -0.047] ]]
//    ]
        }
    };

    var addFeature = function(feature) {
        feature.obj = L[feature.name]
            .apply(null, feature.options)
            .addTo(mapService.getMap());
    };

    var removeFeature = function(feature) {
        mapService.getMap().removeLayer(feature.obj);
        feature.obj = null;
    };

    $scope.toggleFeature = function(featureType) {
        var feature = features[featureType];

        if (feature.obj) {
            removeFeature(feature);
      }  else {
            addFeature(feature);
      }
    };

//

//    var circle = L.circle([51.508, -0.11], 500, {
//        color: 'red',
//        fillColor: '#f03',
//        fillOpacity: 0.5
//    }).addTo(map);
//
//    var polygon = L.polygon([
//        [51.509, -0.08],
//        [51.503, -0.06],
//        [51.51, -0.047]
//    ]).addTo(map);

}]);