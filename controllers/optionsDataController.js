app.controller('OptionsDataController', ['$scope', 'mapService', 'mapDataService', function($scope, mapService, mapDataService) {
    $scope.toggleFeature = function(featureType) {
        mapDataService.toggleFeature(featureType);
    };
}]);