app.controller('MapFeaturesController', ['$scope', 'mapFeatureService', function ($scope, mapFeatureService) {
    "use strict";
    $scope.initFeatures = function () {
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