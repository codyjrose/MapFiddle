app.controller('OptionsController', ['$scope', 'mapOptionsService', function($scope, mapOptionsService) {
    $scope.getSideBarOptionsAll = function() {
        return mapOptionsService.getSideBarOptions();
    };

    $scope.initOptions = function() {
        $scope.options = $scope.getSideBarOptionsAll();
    };

    // Option templates fire this function on click to raise event 'mapOptionChange'
    $scope.changeHandler = function(item) {
        mapOptionsService.broadcastChangedItem(item);
    };

    // Catch mapCahnge event to update the sideBar option values.
    $scope.$on('mapChange', function() {
        // Save Apply
        $scope.$apply(function() {
            $scope.initOptions();
        });
    });

    // Init the sidebar
    $scope.initOptions();
}]);