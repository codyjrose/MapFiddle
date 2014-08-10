app.controller('MapFeaturesController', ['$scope', 'mapService', 'mapFeatureService', function($scope, mapService, mapFeatureService) {
    $scope.initFeatures = function() {
        $scope.features = mapFeatureService.getAll();
    };

    $scope.broadcastChangedFeature = function (featureName) {
        mapFeatureService.broadcastChangedFeature(featureName);
    };

    $scope.broadcastChangedFeaturePopup = function (featureName) {
        mapFeatureService.broadcastChangedFeaturePopup(featureName);
    };

    $scope.initFeatures();
}]);