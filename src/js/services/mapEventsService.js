app.factory('mapEventsService', ['$rootScope', 'mapTypeService', function ($rootScope, mapTypeService) {
    "use strict";

    var activeMapType = mapTypeService.getActiveMapTypeName();

    $rootScope.$on('mapTypeChange', function(e, mapTypeName) {
        activeMapType = mapTypeName;
        setEventsData();
        setDocsByMapType();
    });

    var lastUpdatedEvent = {},
        events = {},
        eventsByMapType = [
            {
                name: "OSM",
                docs: [
                    {
                        text: "Events",
                        url: "//leafletjs.com/reference.html#events"
                    },
                    {
                        text: "Click event",
                        url: "//leafletjs.com/reference.html#map-click"
                    },
                    {
                        text: "Move end event",
                        url: "//leafletjs.com/reference.html#map-moveend"
                    }
                ],
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
                documentationLink: "",
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
    events.docs = [];

    /**
     * Sets events data by map type name.
     */
    var setEventsData = function() {
        var d = _.find(eventsByMapType, function (event) { return event.name === activeMapType; });
        events.data = d.data;
    };

    /**
     * Sets events doc list by map type.
     */
    var setDocsByMapType = function() {
        var d = _.find(eventsByMapType, function (event) { return event.name === activeMapType; });
        events.docs = d.docs;
    };

    var get = function (eventName) {
        try {
            return _.find(getAll(), { name: eventName });
        } catch (ignore) {}
    };

    var getAll = function () {
        return events.data;
    };

    var getDocs = function () {
        return events.docs;
    };

    var getAllEnabled = function () {
        return _.filter(getAll(), function (event) { return event.enabled; });
    };

    var getDocumentationLink = function() {
        return events.documentationLink;
    };

    var broadcastChangedEvent = function (eventName) {
        lastUpdatedEvent = get(eventName);
        $rootScope.$broadcast('mapEventChange');
    };

    setEventsData();
    setDocsByMapType();

    return {
        get: get,
        getAll: getAll,
        getAllEnabled: getAllEnabled,
        getDocs: getDocs,
        broadcastChangedEvent: broadcastChangedEvent,
        lastUpdatedEvent: function () { return lastUpdatedEvent; }
    };
}]);