app.controller('MapFeaturesController', ['$scope', 'mapFeatureService', function ($scope, mapFeatureService) {
    "use strict";
    $scope.initFeatures = function () {
        $scope.features = mapFeatureService.getAll();
    };

    $scope.initDocs = function () {
        $scope.docs = mapFeatureService.getDocs();
    };

    $scope.broadcastChangedFeature = function (featureName) {
        mapFeatureService.broadcastChangedFeature(featureName);
    };

    $scope.broadcastChangedFeaturePopup = function (featureName) {
        mapFeatureService.broadcastChangedFeaturePopup(featureName);
    };

    $scope.$on('mapTypeChange', function() {
        $scope.initFeatures();
        $scope.initDocs();
    });

    $scope.initFeatures();
    $scope.initDocs();
}]);