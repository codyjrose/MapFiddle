app.controller('NavController', ['$scope', '$location', 'mapCodeService', function($scope, $location, mapCodeService) {
    "use strict";

    // Set default
    this.tab = 'options';

    $scope.showHideText = mapCodeService.showCode() ? "Hide " : "Show ";
    $scope.btnSuccess = true;

    this.selectTab = function (tabName) {
        this.tab = tabName;
    };

    this.selectedTab = function () {
        return this.tab;
    };

    this.isSelectedTab = function(tabName) {
        return this.tab === tabName;
    };

    this.toggleShowCode = function () {
        var toggleShowHideText = mapCodeService.toggleShowCode();
        $scope.btnSuccess = !toggleShowHideText;
        $scope.showHideText = toggleShowHideText ? "Hide " : "Show ";
    };
}]);