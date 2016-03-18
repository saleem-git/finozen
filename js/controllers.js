angular.module('app.controllers', [])

    .controller('signupCtrl', function($scope) {

    })

    .controller('summaryPageCtrl', function($scope) {

    })

    .controller('growthRateCtrl', function($scope,$rootScope) {
$scope.terms = function()
{
	//window.open('http://finozen.com/t&c.html','_self');
	var win = window.open( "http://finozen.com", "_system" );
win.addEventListener( "loadstop", function() {

        win.close();
});
	//window.open = cordova.InAppBrowser.open;
	//var ref = cordova.InAppBrowser.open('http://finozen.com/t&c.html', '_self', 'location=yes');
}
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
$sessionStorage.SessionClientName=signupForm.fName+' '+signupForm.lName;
$sessionStorage.SessionMobNo=signupForm.mobileNumber;
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
				//$sessionStorage.
				$sessionStorage.SessionPortfolio=(JSON.parse(data.jsonStr)).portfolioCode;
                if(data.responseCode!="Cali_SUC_1030"){
					if(data.responseCode=="Cali_ERR_2050"){
						$scope.serverError="Mobile number in use";
					}
					else{
						$scope.serverError="Sign Up failed, please try again";
					}
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
    $sessionStorage.forgotPinPhone = $scope.authorization.login;
    var ph=$sessionStorage.forgotPinPhone;
    $http.get('http://205.147.99.55:8080/WealthWeb/ws/clientFcps/forgotPassword?mobileNumber='+ph); //sending the otp to the phone number
    $state.go('forgot_pin');
    }
    else{
      $scope.message="Please enter your mobile number to reset PIN";
    }
  }

  $scope.sendSignIn=function() {
    loginInfoService.getJsonId($sessionStorage.loginData).then(function(data){

      if(data.responseCode!="Cali_SUC_1030"){
        $scope.serverError="Entered Credentials did not validate";
        }
        else {
          $sessionStorage.SessionIdstorage = data.msg;
          $sessionStorage.SessionPortfolio =data.jsonStr[0].pfolioCode;
          $sessionStorage.SessionStatus =data.jsonStr[0].activeStatus;
          $sessionStorage.SessionClientName =data.jsonStr[0].clientName;
          $sessionStorage.SessionClientCode =data.jsonStr[0].clientCode;
          $sessionStorage.SessionMobNo =data.jsonStr[0].mobileNo;
          $sessionStorage.clientActive = data.jsonStr[0].clientActive;
          $sessionStorage.folioNums = data.jsonStr[0].folioNums[0];

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


    .controller('transListController',function($scope,$sessionStorage,getPerformanceService,getNAVService,$ionicLoading,getReportService,$timeout) {
var timeNow = new Date().getUTCHours();

$ionicLoading.show();
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
	if((data.jsonStr).length <= 0){console.log(window.Connection + "connection");
	$scope.noTxnMsg1="There are no transactions to display,";
	$scope.noTxnMsg2="START INVESTING NOW";
	$scope.noTxnIcon="img/account-image.png";
    }
    }
  })


  var navDate = getNAVService.get();
  navDate.$promise.then(function(data){
    if(data.responseCode=="Cali_SUC_1030"){
    for(var i = 0; i < (data.jsonStr).length; i++) {
      if(data.jsonStr[i].recco=="Accumulate"){
        $sessionStorage.schemeName=data.jsonStr[i].schemeName;
        $sessionStorage.nav=data.jsonStr[i].nav;
        $sessionStorage.rtaCode=data.jsonStr[i].rtaCode;
        $sessionStorage.amcCode=data.jsonStr[i].amcCode;
      }

    }
    $ionicLoading.hide();
    }
  },function(error){
    console.log("error");
    $ionicLoading.hide();
  })




  $scope.doRefresh=function() {
	  console.log("dsbsk");
   $timeout(function(){
   var Report = getReportService.get();
   Report.$promise.then(function (data) {
       if (data.responseCode == "Cali_SUC_1030") {
           $scope.products = data.jsonStr;
           for (var i = 0; i < (data.jsonStr).length; i++) {
               if (data.jsonStr[i].txnTypeStr == "Buy") {
                   $scope.txnStatusClass = "success";
               }
               else if (data.jsonStr[i].txnTypeStr == "Sell") {
                   $scope.txnStatusClass = "failed";
               }
           }
       }
   })
$scope.$broadcast("scroll.refreshComplete");
},2000)
}

        /*var tList=this;
         tList.products=[];

         $http.get('data/transactiondata.json').success(function(data){
         tList.products=data;
         });*/

    })

    .controller('popOverController',function($scope,$ionicPopover ){

        var template =  '<ion-popover-view class="fit"><ion-content scroll="false"><div class="list"><a class="item pop_up" href="#" target="_blank">Estimated annual returns for your investments till date, and should not be construed as projected returns or actual performance.</a> </div></ion-content>';

        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });


    })


    .controller('showhistoryController', function($scope,$ionicHistory){

        $ionicHistory.clearHistory();
    })

    .controller('navhistoryController', function($scope,$ionicHistory){

        $ionicHistory.goBack(-2);
    })

    /*For social sharing*/
    /*.controller('socialShareController', function($scope,$cordovaSocialSharing){
     $scope.share = function(){
     $scope.shareViaWhatsApp('Hi my money just grew by 2.8%. Try this awesome app','null','http://finotrust.com/');
     }
     })*/


    .controller('AuthWithdrawlCtrl', function($scope, $state,mfSellUrlService,dateService,$sessionStorage,$ionicPopup) {

        $scope.Withdrawl = function(form) {

            var date=dateService.getDate();
            if(form.$valid) {
                //$state.go('successPage');

                if($scope.checked_withdraw == true){

                    mfSellUrlService.save({"portfolioCode": $sessionStorage.SessionPortfolio,"amcCode": $sessionStorage.amcCode,"rtaCode":$sessionStorage.rtaCode,"orderTxnDate": date,"allUnits":"Y","folioNo":$sessionStorage.folioNums},function(data){
                        if(data.responseCode=="Cali_SUC_1030") {
                            $ionicPopup.alert({
                                title: 'Request has been successfully accepted',
                                template: 'Success'
                            });
                            $scope.withdraw_error="Please try again";
                        }
						else
						{
							console.log("failed");
							$ionicPopup.alert({
                            title: 'Request has failed',
                            template: 'Failed'
                        });
						}
                    },function(error){
                        $scope.withdraw_error="Error committing the transaction, please try again"
                        $ionicPopup.alert({
                            title: 'Request has failed',
                            template: 'Please try again'
                        });

                    });
                }
                else{

                    mfSellUrlService.save({"portfolioCode": $sessionStorage.SessionPortfolio,"amcCode":$sessionStorage.amcCode,"rtaCode":$sessionStorage.rtaCode,"orderTxnDate": date,"amount":$scope.amount,"folioNo":$sessionStorage.folioNums},function(data){
                        console.log(data.responseCode);
						if(data.responseCode!="Cali_SUC_1030") {
							console.log("failed");
                            $scope.withdraw_error="Error committing the transaction, please try again";
                            $ionicPopup.alert({
                                title: 'Request has failed',
                                template: 'Please try again'
                            });
                        }
						else
						{
							console.log("success");
							$ionicPopup.alert({
                            title: 'Request has been successfully accepted',
                            template: 'Success'
                        });
						}
                    },function(error){
						console.log("errorr");
                        $scope.withdraw_error="Error committing the transaction, please try again";
                    });

                }

            }

        };

        $scope.amountClear= function() {
            $scope.amount='';
        }

    })
