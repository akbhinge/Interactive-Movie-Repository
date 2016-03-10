
/*
 Declaring angular module to create and render components i.e. add movies to the page
 */

angular.module('movieRepository',['ngRoute']);

var app = angular.module('movieRepository',['ngRoute']);

app.config(function($routeProvider){


    $routeProvider
        .when('/',{
            templateUrl: "HTML/welcome.html",
            controller: "welcomeController"
        })

        .when('/addReview',{
            templateUrl: "HTML/addReview.html",
            controller: "addController"
        })

        .when('/getReview',{
            templateUrl: "HTML/getReview.html",
            controller: "getController"
        })

        .otherwise({
            redirectTo: "/"
        });

});
