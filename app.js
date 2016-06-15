'use strict';

/*
 Declaring angular module to create and render components i.e. add movies to the page
 */

// Application module
angular.module('movieRepository',['ngRoute']);


var movieRepository = angular.module('movieRepository', ['ngRoute']);

// Configure routing for the application
movieRepository.config(['$routeProvider', function($routeProvider){

// Setting html5Mode as true to remove hashtag
   // $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
        templateUrl:'HTML/welcome.html',
        controller : 'welcomeController'
    })
        .when('/addReview',{
        templateUrl : 'HTML/addReview.html',
        controller : 'addController'
    })
        .when('/getReview',{
        templateUrl : 'HTML/getReview.html',
        controller : 'getController'
    })
        .otherwise(
        {redirectTo : "/"}
    );
}]);

