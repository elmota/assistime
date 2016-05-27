angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/confirm.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    // console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('requestCallCtrl', function($scope, $http, $ionicPopup, $timeout, $ionicModal, $ionicLoading) {

  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    }).then(function(){
     console.log("The loading indicator is now displayed");
   });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
     console.log("The loading indicator is now hidden");
   });
  };


  $scope.regex = '^(09[6-9][0-9]{7})$';

  $scope.$watch('myForm.$valid', function(newVal) {
            //$scope.valid = newVal;
            $scope.informationStatus = true;
            // console.log($scope.informationStatus);
          });


  $scope.requestCall = function() {

    $ionicLoading.show();

    $http({
      method :'POST',
      url:'http://200.54.145.94:8082/todial.php?callerid=' + $scope.phone,
      data: { callerid :  $scope.phone},
      headers: {'Content-Type': 'application/json'}
    }).success(function (data, status, headers, config) {

      var div = document.createElement("div");
      div.innerHTML = data;
      var text = div.textContent || div.innerText || "";
      text = text.slice(0, -1);;

      // console.log('numero: ' + text);

      if (text == $scope.phone) {
        // statement
        // console.log(data);
        // console.log('ya');

        // var alertPopup = $ionicPopup.alert({
        //   title: 'Mensaje',
        //   template: 'Lo llamaremos al número enviado en breves momentos.'
        // });

        $ionicLoading.hide();
        $scope.modal.show();


       //  alertPopup.then(function(res) {
       //   console.log('Thank you for not eating my delicious ice cream cone');
       // });

     } else {

       // statement

       // console.log('no');
       $ionicLoading.hide();
       var alertPopup = $ionicPopup.alert({
        title: 'Mensaje',
        template: 'El número enviado no se encuestra registrado, por favor intente nuevamente.'
      });

     }
   });
  }
})

