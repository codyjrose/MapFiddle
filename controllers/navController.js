app.controller('NavController', ['$scope', '$location', 'mapCodeService', function($scope, $location, mapCodeService) {
    "use strict";

    var path = {
        '/options': 1,
        '/features': 2,
        '/events': 3,
        '/about': 4
    };

    $scope.showHideText = mapCodeService.showCode() ? "Hide " : "Show ";
    $scope.btnSuccess = true;

    this.selectTab = function (setTab) {
        this.tab = setTab;
    };

    this.isSelected = function (checkTab) {
        return this.tab === checkTab;
    };

    // Make initial selection.
    this.selectTab($location.path() ? path[$location.path()] : 1);

    this.toggleShowCode = function () {
        var toggleShowHideText = mapCodeService.toggleShowCode();
        $scope.btnSuccess = !toggleShowHideText;
        $scope.showHideText = toggleShowHideText ? "Hide " : "Show ";
    };
}]);