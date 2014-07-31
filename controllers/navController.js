app.controller('NavController', ['$scope', '$location', 'mapCodeService', function($scope, $location, mapCodeService) {
    var path = {
        '/options': 1,
        '/data': 2,
        '/events': 3
    };

    $scope.showHideText = mapCodeService.showCode() ? "Hide " : "Show ";
    $scope.btnSuccess = true;

    this.selectTab = function(setTab) {
        this.tab = setTab;
    };

    this.isSelected = function(checkTab) {
        return this.tab === checkTab;
    };

    // Make initial selection.
    this.selectTab($location.path() ? path[$location.path()]: 1 );

    this.toggleShowCode = function() {
        var toggleShowHideText = mapCodeService.toggleShowCode();
        $scope.btnSuccess = !toggleShowHideText;
        $scope.showHideText = toggleShowHideText ? "Hide " : "Show "
    };
}]);