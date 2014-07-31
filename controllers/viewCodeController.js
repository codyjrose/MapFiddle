app.controller("CodeViewController", ['$scope', '$rootScope', '$timeout', 'mapCodeService', function($scope, $rootScope, $timeout, mapCodeService) {
    $scope.showCode = function() {
        return mapCodeService.showCode();
    };

    var setMarkup = function() {
        $scope.markup = mapCodeService.getCodeView();
    };

    $scope.$on('mapOptionChange', function() {
        setMarkup();
    });
    setMarkup();
}]);