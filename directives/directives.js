app.directive('optionRange', function() {
    return {
        scope: {
            item: '=optionRange'
        },
        restrict: 'AEC',
        templateUrl: 'templates/option-range.html'
    };
});

app.directive('optionCheckbox', function() {
    return {
        scope: {
            item: '=optionCheckbox'
        },
        restrict: 'AEC',
        templateUrl: 'templates/option-checkbox.html'
    };
});

app.directive('prettyprintd', function() {
    return {
        restrict: 'C',
        link: function postLink(scope, element, attrs) {
            scope.$watch('markup', function() {
                element.html(prettyPrintOne(scope.markup));
            });
        }
    };
});