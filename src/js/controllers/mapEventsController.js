app.controller('MapEventsController', ['$scope', 'mapEventsService', function($scope, mapEventsService) {
    "use strict";
    $scope.initEvents = function () {
        $scope.events = mapEventsService.getAll();
    };

    $scope.initDocs = function () {
        $scope.docs = mapEventsService.getDocs();
    };

    $scope.broadcastChangedEvent = function (eventName) {
        mapEventsService.broadcastChangedEvent(eventName);
    };

    $scope.$on('mapTypeChange', function() {
        $scope.initEvents();
        $scope.initDocs();
    });

    $scope.initEvents();
    $scope.initDocs();
}]);