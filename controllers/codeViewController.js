app.controller("CodeViewController", ['$scope', 'mapCodeService', function($scope, mapCodeService) {
    $scope.sections = mapCodeService.generateHtml();
    //$scope.js = mapCodeService.getJS();

    //prettyPrint();

    $scope.$on('mapOptionChange', function() {
        $scope.sections = mapCodeService.generateHtml();
    });
}]);