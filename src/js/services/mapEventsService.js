app.factory('mapEventsService', ['$rootScope', 'mapTypeService', function ($rootScope, mapTypeService) {
    "use strict";

    var activeMapType = mapTypeService.getActiveMapTypeName();

    $rootScope.$on('mapTypeChange', function(e, mapTypeName) {
        activeMapType = mapTypeName;
        setEventsByMapType(activeMapType);
    });

    var lastUpdatedEvent = {},
        events = {},
        eventsByMapType = [
            {
                name: "OSM",
                data: [
                    {
                        name: "click",
                        label: "\"click\" event",
                        popupOptions: {
                            content: function (e) {
                                return 'The \"click\" event fired. You clicked the map at <b>' + e.latlng.lat + ', ' + e.latlng.lng + '</b>!'
                            },
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
                            content: function (e) {
                                return 'The \"moveend\" event fired. The new map center is <b>' + e.target.getCenter().lat + ", " + e.target.getCenter().lng + '</b>!'
                            },
                            eventResultContent: "e.target.getCenter().toString()",
                            latLng: "e.target.getCenter()"
                        },
                        eventLatLng: function (e) {
                            return { lat: e.target.getCenter().lat, lng: e.target.getCenter().lng };
                        },
                        enabled: false,
                        method: "popup"
                    }
                ]
            },
            {
                name: "GM",
                data: [
                    {
                        name: "click",
                        label: "\"click\" event",
                        popupOptions: {
                            content: function (e) { return "The \"click\" event fired. You clicked the map at " + e.latLng.toUrlValue() },
                            eventResultContent: "e.latlng",
                            latLng: "e.latlng"
                        },
                        eventLatLng: function (e) {
                            return e.latLng;
                        },
                        infoWindow: null,
                        enabled: false,
                        method: "popup"
                    }
//                    ,{
//                        name: "center_changed",
//                        label: "\"center_changed\" event",
//                        popupOptions: {
//                            content: function (e) {
//                                return 'The \"center_changed\" event fired. The new map center is <b>' + e.target.getCenter().lat + ", " + e.target.getCenter().lng + '</b>!'
//                            },
//                            eventResultContent: "e.target.getCenter().toString()",
//                            latLng: "e.target.getCenter()"
//                        },
//                        eventLatLng: function (map) {
//                            return map.mapObj.getCenter();
//                        },
//                        infoWindow: null,
//                        enabled: false,
//                        method: "popup"
//                    }
                ]
            }

        ];

    events.data = [];

    /**
     * Sets events data by map type name.
     */
    var setEventsByMapType = function() {
        var d = _.find(eventsByMapType, function (event) { return event.name === activeMapType; });
        events.data = d.data;
    };

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

    setEventsByMapType(activeMapType);

    return {
        get: get,
        getAll: getAll,
        getAllEnabled: getAllEnabled,
        broadcastChangedEvent: broadcastChangedEvent,
        lastUpdatedEvent: function () { return lastUpdatedEvent; }
    };
}]);