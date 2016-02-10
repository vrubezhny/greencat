'use strict';

angular.module('greenCat',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Websites',{templateUrl:'views/Websites/search.html',controller:'SearchWebsitesController'})
      .when('/Websites/new',{templateUrl:'views/Websites/detail.html',controller:'NewWebsitesController'})
      .when('/Websites/edit/:WebsitesId',{templateUrl:'views/Websites/detail.html',controller:'EditWebsitesController'})
      .when('/Words',{templateUrl:'views/Words/search.html',controller:'SearchWordsController'})
      .when('/Words/new',{templateUrl:'views/Words/detail.html',controller:'NewWordsController'})
      .when('/Words/edit/:WordsId',{templateUrl:'views/Words/detail.html',controller:'EditWordsController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
