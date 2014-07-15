app.controller("CodeViewController", ['$scope', 'mapCodeService', function($scope, mapCodeService) {
    $scope.phText = mapCodeService.generateHtml();

    $scope.$on('mapOptionChange', function() {
        $scope.phText = mapCodeService.generateHtml();
    });
}]);