app.controller('MapFeaturesController', ['$scope', 'mapService', 'mapFeatureService', function($scope, mapService, mapFeatureService) {
    $scope.changeHandler = function(featureType) {
        mapFeatureService.broadcastChangedFeature(featureType);
    };
}]);