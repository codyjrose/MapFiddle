app.controller('OptionsController', ['$scope', 'mapOptionsService', function($scope, mapOptionsService) {
    $scope.getSideBarOptionsAll = function() {
        return mapOptionsService.getSideBar();
    };

    $scope.initOptions = function() {
        $scope.options = $scope.getSideBarOptionsAll();
    };

    // Option templates fire this function on click to raise event 'mapOptionChange'
    $scope.changeHandler = function(item) {
        mapOptionsService.broadcastChangedOption(item);
    };

    // Init the sidebar
    $scope.initOptions();
}]);