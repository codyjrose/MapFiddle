var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/options', {
                templateUrl: 'partials/options.html',
                controller: 'OptionsController'
            }).
            when('/data', {
                templateUrl: 'partials/data.html',
                controller: 'OptionsDataController'
            }).
            when('/events', {
                templateUrl: 'partials/events.html',
                controller: 'OptionsEventController'
            }).
            when('/about', {
                templateUrl: 'partials/about.html'
            }).
            otherwise({
                redirectTo: '/options'
            });
    }]);