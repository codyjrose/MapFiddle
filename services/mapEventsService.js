app.factory('mapEventsService', ['$rootScope', 'mapService', function($rootScope, mapService) {

    var lastUpdatedEvent = {},
        events = {};

    events.data = [
        {
            name: 'click event'
        }
    ];

     var get = function (eventName) {
        try {
            return _.find(getAll(), { name: eventName });
        } catch (e) {}
    };

    var getAll = function () {
        return events.data;
    };

    var broadcastChangedEvent = function(eventName) {
        lastUpdatedEvent = get(eventName);
        $rootScope.$broadcast('mapFeaturePopupChange');
    };

    return {
        get: get,
        getAll: getAll,
        broadcastChangedEvent: broadcastChangedEvent
    }
}]);