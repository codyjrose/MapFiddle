app.factory('mapEventsService', ['$rootScope', function ($rootScope) {
    "use strict";

    var lastUpdatedEvent = {},
        events = {};

    events.data = [
        {
            name: "click",
            label: "\"click\" event",
            popupOptions: {
                content: "The \"click\" event fired. You clicked the map at ",
                eventResultContent: "e.latlng",
                latLng: "e.latlng"
            },
            eventLatLng: function (e) {
                return { lat: e.latlng.lat, lng: e.latlng.lng };
            },
            enabled: false,
            method: "popup"
        },
        {
            name: "moveend",
            label: "\"moveend\" event",
            popupOptions: {
                content: "The \"moveend\" event fired. The new map center is ",
                eventResultContent: "e.target.getCenter().toString()",
                latLng: "e.target.getCenter()"
            },
            eventLatLng: function (e) {
                return { lat: e.target.getCenter().lat, lng: e.target.getCenter().lng };
            },
            enabled: false,
            method: "popup"
        }
    ];

    var get = function (eventName) {
        try {
            return _.find(getAll(), { name: eventName });
        } catch (ignore) {}
    };

    var getAll = function () {
        return events.data;
    };

    var getAllEnabled = function () {
        return _.filter(getAll(), function (event) { return event.enabled; });
    };

    var broadcastChangedEvent = function (eventName) {
        lastUpdatedEvent = get(eventName);
        $rootScope.$broadcast('mapEventChange');
    };

    return {
        get: get,
        getAll: getAll,
        getAllEnabled: getAllEnabled,
        broadcastChangedEvent: broadcastChangedEvent,
        lastUpdatedEvent: function () { return lastUpdatedEvent; }

    };
}]);