'use strict';

var app = angular
  .module('pooIhmExemplesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);

/**
 * @ngdoc overview
 * @name pooIhmExemplesApp
 * @description
 * # pooIhmExemplesApp
 *
 * Main module of the application.
 */
app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      // users
      .when('/users' , {
        templateUrl: 'views/Users/list.html',
        controller: 'UsersCtrl'
      })
      .when('/users/add/',{
        templateUrl: 'views/Users/add_user.html',
        controller: 'UsersCtrl'
      })
      .when('/users/edit/:userId',{
        templateUrl: 'views/Users/edit_user.html',
        controller: 'UsersCtrl'
      })
      .when('/users/:userId', {
        templateUrl: 'views/Users/show.html',
        controller: 'UsersCtrl'
      })
      // projects
      .when('/projects' , {
        templateUrl: 'views/Projects/list.html',
        controller: 'ProjectsCtrl'
      })
      .when('/projects/add/',{
        templateUrl: 'views/Projects/add_project.html',
        controller: 'ProjectsCtrl'
      })
      .when('/projects/edit/:projectId',{
        templateUrl: 'views/Projects/edit_project.html',
        controller: 'ProjectsCtrl'
      })
      .when('/projects/:projectId', {
        templateUrl: 'views/Projects/show.html',
        controller: 'ProjectsCtrl'
      })
      // roles
      // projects
      .when('/roles' , {
        templateUrl: 'views/Roles/list.html',
        controller: 'RolesCtrl'
      })
      .when('/roles/add/',{
        templateUrl: 'views/Roles/add_role.html',
        controller: 'RolesCtrl'
      })
      .when('/roles/edit/:projectId',{
        templateUrl: 'views/Roles/edit_role.html',
        controller: 'RolesCtrl'
      })
      .when('/roles/:projectId', {
        templateUrl: 'views/Roles/show.html',
        controller: 'RolesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
