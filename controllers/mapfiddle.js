/**
 * Created by Cody on 12/25/13.
 */
var mfApp = angular.module('mfApp', ['ui.bootstrap']);

mfApp.controller('mfController', function($scope, mapOutputService) {
   $scope.map = null;
   $scope.options = mapOutputService.getOptions();

    $scope.initMap = function() {
        var mapOptions = {};
        angular.forEach($scope.options, function(value, key) {
            if (value.type == "number") {
                mapOptions[key] = parseInt(value.value);
            } else {
                mapOptions[key] = value.value;
            }
        });
        $scope.map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
    };

    $scope.updateOptions = function() {
        // Map is up to date, sync to map options.
        angular.forEach($scope.options, function (value, key) {
            $scope.options[key].value = $scope.map[key];
            console.log(key + ": " + $scope.options[key].value);
        });

        // Save Apply
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.updateMap = function() {
        // Options are up to date, sync to map.
        var mapOptions = {};
        angular.forEach($scope.options, function(value, key) {
            if (value.type == "number") {
                mapOptions[key] = parseInt(value.value);
            } else {
                mapOptions[key] = value.value;
            }
        });

        $scope.map.setOptions(mapOptions);
        //$scope.map.setZoom(parseInt($scope.options.zoom.value));
    };

    angular.element(document).ready(function () {
        $scope.initMap();

        google.maps.event.addListener($scope.map, 'idle', function() {
            $scope.updateOptions();
        });
    });
});

mfApp.factory('mapOutputService', function() {

    var options = {
        zoom: {
            value: 8,
            min: 1,
            max: 21,
            type: "number",
            label: "Zoom"
        },
        center: {
            value: new google.maps.LatLng(-34.397, 150.644),
            type: "object",
            label: "Map Center"
        },
        panControl: {
            value: true,
            type: "boolean",
            label: "Pan Control"
        },
        zoomControl: {
            value: true,
            type: "boolean",
            label: "Zoom Control"
        },
        streetViewControl: {
            value: true,
            type: "boolean",
            label: "Street View Control"
        },
        mapTypeControl: {
            value: true,
            type: "boolean",
            label: "Map Type Control"
        }

    };

    var genHtml = function(data) {
        var return_html = '' +
            '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<title>Simple Map</title>' +
            '<meta name="viewport" content="initial-scale=1.0, user-scalable=no">' +
            '<meta charset="utf-8">' +
            '<style>html, body, #map-canvas { height: 100%; margin: 0px; padding: 0px }</style>' +
            '<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>' +
            '<script>' +
            //'// Zoom Level: ' + $scope.options.zoom +
            'var map;' +
            'function initialize() {' +
            'var mapOptions = {' +
            'zoom: 8,' +
            'center: new google.maps.LatLng(-34.397, 150.644)' +
            '};' +
            'map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);' +
            '}' +
            'google.maps.event.addDomListener(window, "load", initialize);' +
            '</script>' +
            '</head>' +
            '<body>' +
            '<div id="map-canvas"></div>' +
            '</body>' +
            '</html>' +
            '';

        // Need to do some beautifying here at some point: https://github.com/einars/js-beautify

        return return_html;
    };

    return {
        generateHtml: function(data) {
            return genHtml(data);
        },
        getOptions: function() {
            return options;
        }
    };
});

// Angular UI modal stuff
mfApp.controller('HtmlOutputController', function($scope, $modal, mapOutputService) {
    $scope.header = "This is a header!!1";
    $scope.body = mapOutputService.generateHtml("no data");

    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrl,
            resolve: {
                innerScope: function () {
                    return $scope;
                }
            }
        });

//        modalInstance.result.then(
//            function () {
//                $log.info("Modal OK'd at: " + new Date());
//            },
//            function () {
//                $log.info('Modal dismissed at: ' + new Date());
//            }
//        );
    };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
var ModalInstanceCtrl = function ($scope, $modalInstance, innerScope) {
    $scope.header = innerScope.header;
    $scope.body = innerScope.body;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

/*  Directives */
mfApp.directive('optionRange', function() {
    return {
        templateUrl: 'templates/option-range.html'
    };
});

mfApp.directive('optionCheckbox', function() {
    return {
        templateUrl: 'templates/option-checkbox.html'
    };
});
/* /Directives */