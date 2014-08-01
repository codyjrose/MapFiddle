app.controller('MapOptionsController', ['$scope', 'mapOptionsService', function($scope, mapOptionsService) {
    $scope.getConfigurableOptionsAll = function() {
        return mapOptionsService.getUserConfigurable();
    };

    $scope.initOptions = function() {
        $scope.options = $scope.getConfigurableOptionsAll();
    };

    // Option templates fire this function on click to raise event 'mapOptionChange'
    $scope.changeHandler = function(option) {
        mapOptionsService.broadcastChangedOption(option.name);
    };

    // Init the sidebar
    $scope.initOptions();
}]);