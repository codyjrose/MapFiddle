app.controller("CodeViewController", ['$scope', 'mapCodeService', function($scope, mapCodeService) {
    $scope.sections = mapCodeService.getCodeView();
    //$scope.js = mapCodeService.getJS();


    $scope.$on('mapOptionChange', function() {
        $scope.sections = mapCodeService.getCodeView();
    });
}]);