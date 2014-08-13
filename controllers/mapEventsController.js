app.controller('MapEventsController', ['$scope', 'mapEventsService', function($scope, mapEventsService) {
    "use strict";
    $scope.initEvents = function () {
        $scope.events = mapEventsService.getAll();
    };

    $scope.broadcastChangedEvent = function (eventName) {
        mapEventsService.broadcastChangedEvent(eventName);
    };

    $scope.initEvents();
}]);