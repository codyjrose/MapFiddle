app.controller('OptionsDataController', ['$scope', 'mapService', 'mapFeatureService', function($scope, mapService, mapFeatureService) {
    $scope.toggleFeature = function(featureType) {
        mapFeatureService.toggleFeature(featureType);
    };
}]);