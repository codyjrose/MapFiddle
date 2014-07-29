app.controller("CodeViewController", ['$scope', '$rootScope', '$timeout', 'mapCodeService', function($scope, $rootScope, $timeout, mapCodeService) {
    var setMarkup = function() {
        $scope.markup = mapCodeService.getCodeView();
    };

    $scope.$on('mapOptionChange', function() {
        setMarkup();
    });

    setMarkup();
}]);