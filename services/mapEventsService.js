app.factory('mapEventsService', ['$rootScope', 'mapService', function($rootScope, mapService) {

    var lastUpdatedEvent = {},
        events = {};

    events.data = [
        {
            name: 'click event',
            enabled: false,
            leafletFunc: "popup"
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

    var getAllEnabled = function () {
        return _.filter(getAll(), function(event) { return event.enabled });
    };

    var broadcastChangedEvent = function(eventName) {
        lastUpdatedEvent = get(eventName);
        $rootScope.$broadcast('mapEventChange');
    };

    return {
        get: get,
        getAll: getAll,
        getAllEnabled: getAllEnabled,
        broadcastChangedEvent: broadcastChangedEvent,
        lastUpdatedEvent: function() { return lastUpdatedEvent }

    }
}]);