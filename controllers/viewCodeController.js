app.controller("ViewCodeController", ['$scope', '$rootScope', '$timeout', 'mapCodeService', function($scope, $rootScope, $timeout, mapCodeService) {
    $scope.showCode = function() {
        return mapCodeService.showCode();
    };

    var setMarkup = function() {
        $scope.markup = mapCodeService.getCodeView();
    };

    $scope.$on('mapOptionChange', function() {
        setMarkup();
    });
    $scope.$on('mapFeatureChange', function() {
        setMarkup();
    });
    $scope.$on('moveend', function() {
        setMarkup();
    });

    setMarkup();
}]);