'use strict';


/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the pooIhmExemplesApp
 */
app.controller('UsersCtrl', ['$scope', '$http', '$location', '$routeParams',
  function ($scope, $http, $location, $routeParams, $route) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function (data) {
        $scope.users = data.data;
      }).error(function (data) {
        $scope.status = "danger";
        $scope.message = "Couldn't reach the database";
      });

    if ($routeParams.userId) {
      $routeParams.userId = $routeParams.userId.substr(1);
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
        .success(function (data) {
          $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId +'/Projects')
            .success(function (data2) {
              $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Roles?UserId=' + $routeParams.userId)
              .success(function (data3) {
                if (data.status == "success") {
                  $scope.currentUser = data.data;
                  $scope.currentUser.createdAt = $scope.currentUser.createdAt.substr(0,10);
                  $scope.currentUser.updatedAt = $scope.currentUser.updatedAt.substr(0,10);
                  $scope.status = "success";
                  $scope.projects = data2;
                  $scope.roles = data3;
                }
              });
              if (data.status == "success") {
                $scope.currentUser = data.data;
                $scope.status = "success";
                $scope.projects = data2;
              }
            });
          if (data.status == "success") {
            $scope.currentUser = data.data;
            $scope.status = "success"
          } else {
            $scope.status = "warning"
          }
        });
    }

    $scope.myAdd = function (newName, newSurname, newEmail, newWebsite) {

      var putData = validate(newName, newSurname, newEmail, newWebsite);
      if (putData != null) {
        var putJson = JSON.stringify(putData);

        $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Users/', putJson)
          .success(function (data) {
            if (data.status == "success") {
              // change the path
              $location.path('/users')
            }
          });
      } else {
        $location.path('/');
      }

    };

    $scope.edit = function (id, newName, newSurname, newEmail, newWebsite) {
      var putData = new Object();
      putData = validate(newName, newSurname, newEmail, newWebsite);

      if (putData != null) {
        var putJson = JSON.stringify(putData);
        $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + id, putJson)
          .success(function (data) {
            if (data.status == "success") {
              $location.path('/users');
            }
          });
      } else {
        $scope.emailfound = newEmail;
        $scope.nameFound = newName;
        $scope.surnameFound = newSurname;
        $scope.websiteFound = newWebsite;
        $scope.status = "warning";
        $location.path('/users/edit/:' + id);
      }
    };

    $scope.delete = function (id, username, usersurname) {

      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + id)
        .success(function (data) {
          if (data.status == "success") {
            window.location.reload(true);
            $scope.status = data.status;
            $scope.message = "You successfully erased " + username + " " + usersurname;
          }else{
            $scope.status = "danger";
            $scope.message = "Sorry ! Couldn't erase " + username + " " + usersurname;
//            $location.path('/users');
          }
        });
    };

  }]);

function validate(newName, newSurname, newEmail, newSite) {
  var b = true;

  b &= (newName != null && newName != "" /*&& newName.match("[^0-9]") == newName*/);
  b &= (newSurname != null && newSurname != "" /*&& newSurname.match("[^0-9]") == newSurname*/);
  b &= (newEmail != null && newEmail != "" /*&& newEmail.match("/[^\\s@]+@[^\\s@]+\\.[^\\s@]+/") == newEmail*/);
  b &= (newSite != null && newSite != "" /*&& newSite.match("//") == newSite*/);

  if (b) {
    var v = new Object();
    v.name = newName;
    v.surname = newSurname;
    v.email = newEmail/*.match("\\w+(\\.\\w+)?@\\w+\\.\\w+")*/;
    v.website = newSite;
    return v;
  }
  return null;

}
