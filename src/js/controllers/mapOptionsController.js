app.controller('MapOptionsController', ['$scope', 'mapOptionsService', function($scope, mapOptionsService) {
    "use strict";

    $scope.initOptions = function () {
        $scope.options = mapOptionsService.getUserConfigurable();
    };

    $scope.initDocs = function () {
        $scope.docs = mapOptionsService.getDocs();
    };

    // Option templates fire this function on click to raise event 'mapOptionChange'
    $scope.changeHandler = function (option) {
        mapOptionsService.broadcastChangedOption(option.name);
    };

    $scope.$on('mapTypeChange', function() {
        $scope.initOptions();
        $scope.initDocs();
    });

    // Init the sidebar
    $scope.initOptions();
    $scope.initDocs();
}]);