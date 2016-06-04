var app = angular.module('myApp', []);
app.controller('AppCtrl', function ($scope, $http) {

    $scope.cities = [{ //options details for select in html
        value: 'nome, ak',
        label: 'Nome'
    }, {
        value: 'chicago, il',
        label: 'Chicago'
    }, {
        value: 'dallas, tx',
        label: 'Dallas'
    }];

    $scope.selectCity = function (citiesList) {
        $http.get('/cityInfo/' + citiesList.value).success(function (response) {
            $scope.result = response; //result data from server
        });
    };
});
