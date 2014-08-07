app.factory('mapEventsService', ['$rootScope', 'mapService', function($rootScope, mapService) {

    var lastUpdatedEvent = {},
        events = {};

    events.data = [
        {
            name: "click",
            label: "click event",
            popupOptions: {
                content: "The \"click\" event fired. You clicked the map at ",
                eventResultContent: "e.latlng.toString()",
                latLng: "e.latlng"
            },
            enabled: false,
            method: "popup"
        },
        {
            name: "zoomend",
            label: "zoom end event",
            popupOptions: {
                content: "The \"zoomend\" event fired. The new zoom level is ",
                eventResultContent: "e.target.getZoom()",
                latLng: "e.target.getCenter()"
            },
            enabled: false,
            method: "popup"
        },
        {
            name: "moveend",
            label: "move end event",
            popupOptions: {
                content: "The \"moveend\" event fired. The new map center is ",
                eventResultContent: "e.target.getCenter().toString()",
                latLng: "e.target.getCenter()"
            },
            enabled: false,
            method: "popup"
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