app.controller("ViewCodeController", ['$scope', '$timeout', 'mapCodeService', function($scope, $timeout, mapCodeService) {
    "use strict";

    $scope.showCode = function () {
        return mapCodeService.showCode();
    };

    var setMarkup = function () {
        $timeout(function () { $scope.markup = mapCodeService.getCodeView(); }, 0);
    };

    $scope.$on('mapOptionChange', function () {
        setMarkup();
    });
    $scope.$on('mapFeatureChange', function () {
        //setMarkup();
    });
    // Marker, circle, polygon has been added or removed, let everyone know.
    $scope.$on('mapFeaturePopupChange', function () {
        setMarkup();
    });
    $scope.$on('mapMoveEnd', function () {
        setMarkup();
    });

    $scope.$on('mapEventChange', function () {
        setMarkup();
    });

    setMarkup();
}]);