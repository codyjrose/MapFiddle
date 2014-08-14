"use strict";

var app = angular.module('app', ['ngRoute'])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/options', { templateUrl: 'partials/options.html', controller: 'MapOptionsController' }).
                when('/features', { templateUrl: 'partials/features.html', controller: 'MapFeaturesController' }).
                when('/events', { templateUrl: 'partials/events.html', controller: 'MapEventsController' }).
                when('/about', { templateUrl: 'partials/about.html' }).
                otherwise({ redirectTo: '/options' });
        }]);