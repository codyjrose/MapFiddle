app.controller('NavController', ['$scope', '$location', 'mapCodeService', 'mapTypeService', function($scope, $location, mapCodeService, mapTypeService) {
    "use strict";

    // Set map options for <select>
    $scope.mapTypes = mapTypeService.getAll();
    $scope.selectedMapType = mapTypeService.getActiveMapType();

    // Set the text and color of the show/hide code button
    $scope.showHideText = mapCodeService.showCode() ? "Hide " : "Show ";
    $scope.btnSuccess = true;

    // Set default selected tab on options panel
    this.tab = 'options';

    // Set the selected tab by name
    this.selectTab = function (tabName) {
        this.tab = tabName;
    };

    // Get the name of the selected tab
    this.selectedTab = function () {
        return this.tab;
    };

    // Check whether a tab is selected by name
    this.isSelectedTab = function(tabName) {
        return this.tab === tabName;
    };

    // Toggle show/hide variables
    this.toggleShowCode = function () {
        // Toggle the showCode var on the service so the viewCodeController sees the change and shows itself.
        var toggleShowHideText = mapCodeService.toggleShowCode();
        $scope.btnSuccess = !toggleShowHideText;
        $scope.showHideText = toggleShowHideText ? "Hide " : "Show ";
    };

    // Option templates fire this function on click to raise event 'mapOptionChange'
    $scope.changeHandler = function () {
        mapTypeService.setMapType($scope.selectedMapType.name);
        mapTypeService.broadcastMapTypeChange();
    };
}]);