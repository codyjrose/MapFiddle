app.controller('MapFeaturesController', ['$scope', 'mapService', 'mapFeatureService', function($scope, mapService, mapFeatureService) {

    $scope.changeHandler = function(featureType) {
        mapFeatureService.broadcastChangedFeature(featureType);
    };

//    // Options have been changed via the sidebar, update the map!
//    $scope.$on('mapFeatureChange', function() {
//        var feature = mapFeatureService.lastUpdatedFeature("featureType");
//        mapService.setMapOption(option);
//    });
}]);