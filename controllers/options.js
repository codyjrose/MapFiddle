app.controller('OptionsController', ['$scope', 'mapOptionsService', function($scope, mapOptionsService) {
    this.getSideBarOptionsAll = function() {
        return mapOptionsService.getSideBarOptions();
    };

    $scope.changeHandler = function(item) {
        mapOptionsService.broadcastChangedItem(item);
    };
}]);