angular.module('app.subcontrollerTwo', [])

    .controller('changeCtrl', function(changePinService,$scope,$sessionStorage,$ionicPopup,$state){

        $scope.forgotPin=function(changePinForm){

            changePinForm.clientCode=$sessionStorage.SessionClientCode;
            changePinForm=JSON.stringify(changePinForm);
            console.log(changePinForm + " form data");
//changePinService.changePin(changePinForm);
            changePinService.save(changePinForm,function(data){
                console.log(data);
                if(data.responseCode == "Cali_SUC_1030") {


                    var popup= $ionicPopup.alert({
                        title: 'PIN Change status',
                        template: 'PIN Changed Successfully'
                    });

                    popup.then(function(res) {
                        $state.go("account");
                    });
                }
                else {
                    console.log("Error");
                    $ionicPopup.alert({
                        title: 'PIN Change status',
                        template: 'PIN Change Unsuccessful'
                    });
					popup.then(function(res) {
                        $state.go("account");
                    });
                }
            },function(error){
                console.log("eror");

            });

        }

    })

    /*for destroying the session storage*/
    .controller('signoutCtrl',function($scope,$state,$ionicHistory,$timeout){

        $scope.signOut = function(){
           
            $timeout(function () {
                $ionicHistory.clearCache();
               $ionicHistory.clearHistory();
            },100)
             $state.go('login');
        }
    })

.controller('ChequeImageCTRl',function($scope,$sessionStorage,$http,$state,$ionicPopup){
  $scope.chequeImage=function(){
  $scope.cheque=JSON.stringify($sessionStorage.clientCode);
  $scope.cheque=JSON.stringify(image);//image data

  $http.post('http://205.147.99.55:8080/WealthWeb/ws/clientFcps/setNewPassword', cheque).success(function(data){

$sessionStorage.KYPH=data.KYPH;
    if(data.responseCode=="Cali_SUC_1030"){

      var popup= $ionicPopup.alert({
        title: 'cheque Change status',
        template: 'cheque Changed Successfully'
      });

      popup.then(function(res) {
        $state.go("bankdetails"); //path name for the  bang page
      });
    }
    else {
      $ionicPopup.alert({
        title: 'cheque Change status',
        template: 'cheque Changed UnSuccessfully'
      });
      popup.then(function(res) {
        $state.go("panImage"); //same path name for the panImage page
      });
    }


  }).error(function(data){
    {
      console.log("Error");
      $ionicPopup.alert({
        title: 'cheque Change status',
        template: 'cheque Changed UnSuccessfully'
      });
    }
  });

  }
})
  .controller('SignatureImageCTRL',function($scope,$$sessionStorage,$http,$ionicPopup){

var signatureImage = function(){
  $scope.signature=JSON.stringify($sessionStorage.KYPH);
  $scope.signature=JSON.stringify(image);
  $http.post('http://205.147.99.55:8080/WealthWeb/ws/clientFcps/setNewPassword', signature).success(function(data){
    if(data.responseCode=="Cali_SUC_1030"){

      var popup= $ionicPopup.alert({
        title: 'signature Change status',
        template: 'signature Changed Successfully'
      });

      popup.then(function(res) {

      });
    }
    else {
      $ionicPopup.alert({
        title: 'signature Change status',
        template: 'signature Changed UnSuccessfully'
      });
      popup.then(function(res) {

      });
    }


  }).error(function(data){
    {
      console.log("Error");
      $ionicPopup.alert({
        title: 'signature Change status',
        template: 'signature Changed UnSuccessfully'
      });
    }
  });

}
})

  .controller('bankDetailsCTRL',function($scope,$sessionStorage,$http,$ionicPopup){
    var bankDetail=function(){
      var bank = JSON.stringify($sessionStorage.clientCode);
      //bank account number
      //bank ifsc code
      $http.post('http://205.147.99.55:8080/WealthWeb/ws/clientFcps/setNewPassword', bank).success(function(data){
        if(data.responseCode=="Cali_SUC_1030"){

          var popup= $ionicPopup.alert({
            title: 'bank Change status',
            template: 'bank Changed Successfully'
          });

          popup.then(function(res) {
            //$state.go("login");
          });
        }
        else {
          $ionicPopup.alert({
            title: 'bank Change status',
            template: 'bank Changed UnSuccessfully'
          });
          popup.then(function(res) {
           // $state.go("login");
          });
        }


      }).error(function(data){
        {
          console.log("Error");
          $ionicPopup.alert({
            title: 'bank Change status',
            template: 'bank Changed UnSuccessfully'
          });
        }
      });

    }
  })

  .controller('adhaarCTRL',function($scope,$http,$ionicPopup,$sessionStorage){
    var adhaarFunc=function(){
      $sessionStorage.adhaar= //data from the page where it is coming from
      $http.post('http://205.147.99.55:8080/WealthWeb/ws/clientFcps/setNewPassword', adhaar).success(function(data){
        console.log(data+'response');
        if(data.responseCode=="Cali_SUC_1030"){

          var popup= $ionicPopup.alert({
            title: 'adhaar Change status',
            template: 'adhaar Changed Successfully'
          });

          popup.then(function(res) {
           // $state.go("login");
          });
        }
        else {
          $ionicPopup.alert({
            title: 'adhaar Change status',
            template: 'adhaar Changed UnSuccessfully'
          });
          popup.then(function(res) {
           // $state.go("login");
          });
        }


      }).error(function(data){
        {
          console.log("Error");
          $ionicPopup.alert({
            title: 'adhaar Change status',
            template: 'adhaar Changed UnSuccessfully'
          });
        }
      });

    }
  })

    .controller('forgotPinCtrl', function($scope,$sessionStorage,$http,$state,$ionicPopup) {
        $scope.resetPin=function(change) {
          $scope.forget5 = JSON.parse(forgotPin2(change));
          $scope.forget5.mobileNumber = JSON.stringify($sessionStorage.forgotPinPhone);
          var forgotpinPass = JSON.stringify($scope.forget5);
          console.log(forgotpinPass + 'string');
          $http.post('http://205.147.99.55:8080/WealthWeb/ws/clientFcps/setNewPassword', forgotpinPass).success(function(data){
            console.log(data+'response');
            if(data.responseCode=="Cali_SUC_1030"){

              var popup= $ionicPopup.alert({
                title: 'PIN Change status',
                template: 'PIN Changed Successfully'
              });

              popup.then(function(res) {
                $state.go("login");
              });
            }
			else {
				$ionicPopup.alert({
                title: 'PIN Change status',
                template: 'PIN Change UnSuccessful'
				});
				popup.then(function(res) {
                $state.go("login");
              });
			}


          }).error(function(data){
            {
              console.log("Error");
              $ionicPopup.alert({
                title: 'PIN Change status',
                template: 'PIN Changed UnSuccessfully'
              });
            }
          });

        }
        var  forgotPin2 = function(change2){
            return JSON.stringify(change2)
        }



})
/*For session timeout*/
    .controller('EventsCtrl', function($scope, Idle,$ionicPopup) {
    $scope.events = [];

    $scope.$on('IdleStart', function() {
        // the user appears to have gone idle
        console.log("Start");
    });

    $scope.$on('IdleWarn', function(e, countdown) {
        console.log("Warning");
        // follows after the IdleStart event, but includes a countdown until the user is considered timed out
        // the countdown arg is the number of seconds remaining until then.
        // you can change the title or display a warning dialog from here.
        // you can let them resume their session by calling Idle.watch()
        alert('You are about to be logged out');
        Idle.watch();
    });

    $scope.$on('IdleTimeout', function() {
        // the user has timed out (meaning idleDuration + timeout has passed without any activity)
        // this is where you'd log them
        console.log("Signout");
        $ionicPopup.alert({
                        title: 'Timeout',
                        template: 'You will be logged out'
                    });
    });

    $scope.$on('IdleEnd', function() {
        // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
    });

    $scope.$on('Keepalive', function() {
        // do something to keep the user's session alive
    });

})

  .controller('adhaarVerification',function($scope,$sessionStorage,$http,$ionicPopup,$state){

    var adhaarVerify=function(){
      $scope.adhaar= JSON.stringify($sessionStorage.adhaar);
      $scope.adhaar= JSON.stringify(otp);
      $http.post('http://205.147.99.55:8080/WealthWeb/ws/clientFcps/setNewPassword', adhaar).success(function(data){
        if(data.responseCode=="Cali_SUC_1030"){

          var popup= $ionicPopup.alert({
            title: 'Verification status',
            template: 'Verification done Successfully'
          });

          popup.then(function(res) {
            //$state.go("login");welcome page
          });
        }
        else {
          $ionicPopup.alert({
            title: 'Verification status',
            template: 'Verification was UnSuccessful'
          });
          popup.then(function(res) {
          });
        }


      }).error(function(data){
        {
          console.log("Error");
          $ionicPopup.alert({
            title: 'Verification status',
            template: 'Their was a problem please try again'
            //$state.go('signup'); give the path name for the last page before welcome page
          });
        }
      });

    }
  })