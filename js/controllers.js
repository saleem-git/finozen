
angular.module('app.controllers', [])

    .controller('signupCtrl', function($scope) {

    })

    .controller('summaryPageCtrl', function($scope) {

    })

    .controller('growthRateCtrl', function($scope) {

    })
    .controller('inviteCtrl', function($scope) {

    })
    .controller('termsCtrl', function($scope) {

    })

    .controller('recentTransactionsCtrl', function($scope) {

    })
    .controller('pre_verificationCtrl', function($scope) {

    })

    .controller('AuthSignUpCtrl', function($scope, $state,signUpService,$sessionStorage) {

        $scope.signIn = function(form,searchText2,signupForm) {
            console.log(angular.equals(signupForm.pin,searchText2)+ " searchText" );
            console.log(searchText2+ " searchText2" );
            if(angular.equals(signupForm.pin,searchText2))
            {
                if(form.$valid) {
                    $sessionStorage.signUpData = (signupForm);
                    $scope.addUserInfo();
                }
            }
            else{
                $scope.error="Entered password didn't match";

            }
        }

        $scope.addUserInfo=function(){
            signUpService.sendSignUp($sessionStorage.signUpData).then(function(data){
                if(data.responseCode!="Cali_SUC_1030"){
                    $scope.serverError="Sign Up failed, please try again";
                }
                else {
                    $state.go('pre_verification');
                }
            },function(error){
                $scope.serverError="Sign Up failed, please call us";

            });
        }
    })

    /*For Sign In*/

.controller('AuthSigninCtrl', function($scope,$state,$sessionStorage,$http,loginInfoService) {
 //$state.go('tabsController.summaryPage');
  $scope.signIn = function(form,loginForm) {
    if(form.$valid) {
      $sessionStorage.loginData=loginForm;
       $scope.sendSignIn();

    }
  }
    $scope.forgotPin=function(signinformData){
  if(signinformData.$valid){
    console.log('phone number'+$scope.authorization.login);
    $sessionStorage.forgotPinPhone = $scope.authorization.login;
    var ph=$sessionStorage.forgotPinPhone;
    $http.get('http://205.147.99.55:8080/WealthWeb/ws/clientFcps/forgotPassword?mobileNumber='+ph); //sending the otp to the phone number
    console.log('success');
    $state.go('forgot_pin');
    }
    else{
      console.log("error");
      $scope.message="Please enter your mobile number to reset PIN";
    }
  }

  $scope.sendSignIn=function() {
    loginInfoService.getJsonId($sessionStorage.loginData).then(function(data){

      if(data.responseCode!="Cali_SUC_1030"){
        $scope.serverError="Entered Credentials did not validate";
        }
        else {
          console.log(data.jsonStr);
          $sessionStorage.SessionIdstorage = data.msg;
          $sessionStorage.SessionPortfolio =data.jsonStr[0].pfolioCode;
          $sessionStorage.SessionStatus =data.jsonStr[0].activeStatus;
          $sessionStorage.SessionClientName =data.jsonStr[0].clientName;
          $sessionStorage.SessionClientCode =data.jsonStr[0].clientCode;
          $sessionStorage.SessionMobNo =data.jsonStr[0].mobileNo;
          $sessionStorage.clientActive = data.jsonStr[0].clientActive;
         $state.go('tabsController.summaryPage');
       }
        },function(error){

      $scope.serverError="Entered Credentials did not validate";
    });
  }


    })

    .controller('transactionAccessCtrl', function($scope,$sessionStorage){

  if($sessionStorage.clientActive!="Y") {
    $scope.withdrawUrl="#/status";
    $scope.investUrl="#/status";
  }
  else {
     $scope.withdrawUrl="#/withdraw";
      $scope.investUrl="#/invest";
  }

    })





.controller('popupController', function($scope, $ionicPopup,$window) {
     // Triggered on a button click, or some other target
 $scope.showPopup = function() {

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                title: 'Please have a look at the FAQ before placing a call',
                buttons: [
                    { text: 'Call',
                        onTap:function(e){
                            window.location.href="tel:080-41245883";
                        }

                    },

                    {
                        text: '<b>Faq</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            //don't allow the user to close unless he enters wifi password
                            window.location.href="#/faq";

                        }
                    },
                ]
            });


        };

    })



    .controller('privacyCtrl', function($scope) {

    })
    .controller('sidemenuCtrl', function($scope) {

    })





   .controller('tourCtrl', function($scope) {

    })
    .controller('feedbackCtrl', function($scope) {

    })

    .controller('transListController',function($scope,$sessionStorage,getPerformanceService,getNAVService,getReportService) {
var timeNow = new Date().getUTCHours();
        /* $http.get('http://205.147.99.55:8080/WealthWeb/ws/clientRepos/getPerfomRepo?pfolioCode='+$sessionStorage.SessionPortfolio+'&endDate=09/03/201&noOfDays=40').then(function(resp) {
         console.log('Success',resp.data.responseCode);
         // For JSON responses, resp.data contains the result
         }, function(err) {
         console.error('ERR', err);
         // err.status will contain the status code
         })
         */
console.log(timeNow);
var reportDate = getPerformanceService.get();
reportDate.$promise.then(function(data){
 if (data.responseCode == "Cali_SUC_1030") {

$sessionStorage.amcCode=data.jsonStr.amcCode;
$sessionStorage.gainMonth=data.jsonStr.gainMonth;
$sessionStorage.gainToday=data.jsonStr.gainToday;
$sessionStorage.gainTotal=data.jsonStr.gainTotal;
$sessionStorage.list=data.jsonStr.list;
$sessionStorage.mktValue=data.jsonStr.mktValue;
$sessionStorage.msg=data.jsonStr.msg;
$sessionStorage.netInv=data.jsonStr.netInv;
$sessionStorage.paymentMode=data.jsonStr.paymentMode;
$sessionStorage.quantity=data.jsonStr.quantity;
$sessionStorage.rtaCode=data.jsonStr.rtaCode;
$sessionStorage.xirr=data.jsonStr.xirr;
 }
})

  var Report = getReportService.get();
  Report.$promise.then(function(data){
    if(data.responseCode=="Cali_SUC_1030"){
      $scope.products=data.jsonStr;
    for(var i = 0; i < (data.jsonStr).length; i++) {
      if(data.jsonStr[i].txnTypeStr=="Buy"){
        $scope.txnStatusClass="success";
      }
      else if(data.jsonStr[i].txnTypeStr=="Sell"){
        $scope.txnStatusClass="failed";
      }
    }
    }
  })


  var navDate = getNAVService.get();
  navDate.$promise.then(function(data){
    if(data.responseCode=="Cali_SUC_1030"){
  console.log((data.jsonStr).length );
    for(var i = 0; i < (data.jsonStr).length; i++) {
      if(data.jsonStr[i].recco=="Accumulate"){
        $sessionStorage.schemeName=data.jsonStr[i].schemeName;
        $sessionStorage.nav=data.jsonStr[i].nav;
        console.log($sessionStorage.schemeName);
        console.log($sessionStorage.nav);
        console.log(i);
      }
      
    }
    }
  })

        /*var tList=this;
         tList.products=[];

         $http.get('data/transactiondata.json').success(function(data){
         tList.products=data;
         });*/

    })

    .controller('popOverController',function($scope,$ionicPopover ){

        var template =  '<ion-popover-view class="fit"><ion-content scroll="false"><div class="list"><a class="item pop_up" href="#" target="_blank">Annualized rate of growth of your investments.</a> </div></ion-content>';

        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });


    })


    .controller('showhistoryController', function($scope,$ionicHistory){
        /*console.log($ionicHistory.currentStateName()  + "vviewHistory");
         console.log($ionicHistory.backTitle() + "back");*/
        $ionicHistory.clearHistory();
    })

    .controller('navhistoryController', function($scope,$ionicHistory){
        /*console.log($ionicHistory.currentStateName()  + "vviewHistory");
         console.log($ionicHistory.backTitle() + "back");*/
        $ionicHistory.goBack(-2);
    })

    /*For social sharing*/
    /*.controller('socialShareController', function($scope,$cordovaSocialSharing){
     $scope.share = function(){
     $scope.shareViaWhatsApp('Hi my money just grew by 2.8%. Try this awesome app','null','http://finotrust.com/');
     }
     })*/


    .controller('AuthWithdrawlCtrl', function($scope, $state,mfSellUrlService,dateService,$sessionStorage) {

        $scope.Withdrawl = function(form) {

            var date=dateService.getDate();
            if(form.$valid) {
                //$state.go('successPage');

                if($scope.checked_withdraw == true){

                    mfSellUrlService.save({"portfolioCode": $sessionStorage.SessionPortfolio,"amcCode": "KMMF","rtaCode":"K745","orderTxnDate": date,"allUnits":"Y","folioNo":"2023421/94"},function(data){
                        if(data.responseCode!="Cali_SUC_1030") {
                            $scope.withdraw_error="Error committing the transaction, please try again";
                        }
                    },function(error){
                        $scope.withdraw_error="Error committing the transaction, please try again"
                    });
                }
                else{

                    mfSellUrlService.save({"portfolioCode": $sessionStorage.SessionPortfolio,"amcCode": "KMMF","rtaCode":"K745","orderTxnDate": date,"quantity":$scope.amount,"allUnits":"N","folioNo":"2023421/94"},function(data){
                        if(data.responseCode!="Cali_SUC_1030") {
                            $scope.withdraw_error="Error committing the transaction, please try again";
                        }
                    },function(error){
                        $scope.withdraw_error="Error committing the transaction, please try again";
                    });

                }

            }

        };

        $scope.amountClear= function() {
            $scope.amount='';
        }

    })


  .controller('TestCtrl', function($scope, $ionicLoading) {

   $scope.showLoading = function() {
      $ionicLoading.show();
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };
});