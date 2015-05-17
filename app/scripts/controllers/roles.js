'use strict';


/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:RolesCtrl
 * @description
 * # RolesCtrl
 * Controller of the pooIhmExemplesApp
 */
app.controller('RolesCtrl', ['$scope', '$http', '$location', '$routeParams',
  function ($scope, $http, $location, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function (data) {
        $scope.projects = data.data;
      });

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function (data) {
        $scope.users = data.data;
      });

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Roles')
      .success(function (data) {
        $scope.Roles = data.data;
      }).error(function (data) {
        $scope.status = "danger";
        $scope.message = "Couldn't reach the database";
      });

    // get a single roles
    if ($routeParams.rolesId) {
      $routeParams.rolesId = $routeParams.rolesId.substr(1);
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + $routeParams.rolesId)
        .success(function (data) {
          if (data.status == "success") {
            $scope.currentRole = data;
            $scope.status = "success"
          } else {
            $scope.status = "warning"
          }
        })
        .error(function(data){
          $scope.message = "an error occured";
          $scope.alert = "danger";
          $location.path('/');
        });
    }

    // add a roles
    $scope.myAdd = function (newName, newProject, newUser) {
      window.alert("NOT IMPLEMENTED YET ! COMING SOON !");
      /*var putData = validate(newName, newProject, newUser);
      if (putData != null) {
        var putJson = JSON.stringify(putData);

        $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/', putJson)
          .success(function (data) {
            if (data.status == "success") {
              // change the path
              $location.path('/Roles')
            }
          });
      } else {
        $location.path('/');
      }*/
    };

    // edit a roles
    $scope.edit = function (id, newName, newYear, newDescription) {
      window.alert("NOT IMPLEMENTED YET ! COMING SOON !");
      /*var putData = validate(newTitle, newYear, newDescription);

      if (putData != null) {
        var putJson = JSON.stringify(putData);
        $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + id, putJson)
          .success(function (data) {
            if (data.status == "success") {
              $location.path('/Roles');
              $scope.aroles = putData;
            }
          });
      } else {
        $scope.status = "warning";
        $scope.message = "Not Match : " + newTitle +" , " + newYear + " , " + newDescription;
        $location.path('/Roles/edit/:' + id);
      }*/
    };


    // delete a roles
    $scope.delete = function (id) {

      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + id)
        .success(function (data) {
          if (data.status == "success") {
            window.location.reload(true);
            $scope.status = data.status;
            $scope.message = "You successfully erased a role" ;
          } else {
            $scope.status = "danger";
            $scope.message = "Sorry ! Couldn't erase that role";
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
