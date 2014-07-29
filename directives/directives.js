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

function replaceText(str)
{
    var str1 = String(str);
    return str1.replace(/\n/g,"<br/>");
}

app.directive('prettyprintd', function() {
    return {
        restrict: 'C',
        link: function postLink(scope, element, attrs) {
            scope.$watch('markup', function() {
                element.html(prettyPrintOne(scope.markup));
                //element.html(prettyPrintOne(replaceText(element.html()),'',true));
            });
        }
    };
});