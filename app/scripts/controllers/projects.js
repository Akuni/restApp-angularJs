'use strict';


/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the pooIhmExemplesApp
 */
app.controller('ProjectsCtrl', ['$scope', '$http', '$location', '$routeParams',
  function ($scope, $http, $location, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function (data) {
        $scope.projects = data.data;
      }).error(function (data) {
        $scope.status = "danger";
        $scope.message = "Couldn't reach the database";
      });

    // get a single project
    if ($routeParams.projectId) {
      $routeParams.projectId = $routeParams.projectId.substr(1);
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId)
        .success(function (data) {
          if (data.status == "success") {
            $scope.currentProject = data.data;
            $scope.currentProject.createdAt = $scope.currentProject.createdAt.substr(0,10);
            $scope.currentProject.updatedAt = $scope.currentProject.updatedAt.substr(0,10);
            $scope.status = "success"
          } else {
            $scope.status = "warning"
          }
        });
    }

    // add a project
    $scope.myAdd = function (newTitle, newYear, newDescription) {

      var putData = validate(newTitle, newYear, newDescription);
      if (putData != null) {
        var putJson = JSON.stringify(putData);

        $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/', putJson)
          .success(function (data) {
            if (data.status == "success") {
              // change the path
              $location.path('/projects')
            }
          });
      } else {
        $location.path('/');
      }
    };

    // edit a project
    $scope.edit = function (id, newTitle, newYear, newDescription) {
      var putData = validate(newTitle, newYear, newDescription);

      if (putData != null) {
        var putJson = JSON.stringify(putData);
        $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + id, putJson)
          .success(function (data) {
            if (data.status == "success") {
              $location.path('/projects');
              $scope.aproject = putData;
            }
          });
      } else {
        $scope.status = "warning";
        $scope.message = "Not Match : " + newTitle +" , " + newYear + " , " + newDescription;
        $location.path('/projects/edit/:' + id);
      }
    };


    // delete a project
    $scope.delete = function (id, projectname) {

      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + id)
        .success(function (data) {
          if (data.status == "success") {
            window.location.reload(true);
            $scope.status = data.status;
            $scope.message = "You successfully erased " + projectname ;
          } else {
            $scope.status = "danger";
            $scope.message = "Sorry ! Couldn't erase " + projectname;
//            $location.path('/projects');
          }
        });
    };

  }]);

function validate(newTitle, newYear, newDescription) {
  var b = true;

  b &= (newTitle != null && newTitle != "" /*&& newName.match("[^0-9]") == newName*/);
  b &= (newYear != null && newYear != "" );
  b &= (newDescription != null && newDescription != "" );

  if (b) {
    var v = new Object();
    v.title = newTitle;
    v.year = newYear;
    v.description = newDescription;
    return v;
  }
  return null;

}
