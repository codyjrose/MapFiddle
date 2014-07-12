app.controller("CodeViewController", ['$scope', 'mapCodeService', function($scope, mapCodeService) {
    $scope.phText = mapCodeService.generateHtml();
}]);