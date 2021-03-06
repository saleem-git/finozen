// Ionic Starter App

var confirmation = 0;
angular.module('app', ['ionic','ionic.service.core','app.controllers', 'ionicProcessSpinner' , 'app.subcontrollerOne','pascalprecht.translate','app.subcontrollerTwo' , 'app.routes', 'app.services', 'app.directives','ngResource', 'ngMessages','ngStorage','ngIdle','ngCordova', 'ionic-toast','ionic-datepicker'])

.config(function ($translateProvider) {


    $translateProvider.translations('2', {
	selectedLanguage:'Select your desired Language English',
	tabTitle1:'SUMMARY',
	tabTitle2:'CALCULATOR',
	tabTitleFlip:'GROWTH RATE',
	tabTitle3:'TRANSACTIONS',
	TEXT_LANG_BALANCE:'CURRENT BALANCE',
	TEXT_LANG_NETGAIN:'Net Gains',
	TEXT_LANG_NETGAINTODAY:'Net Gains Today',
	TEXT_LANG_INVEST:'Net Investment',
	BUTTON_LANG_WITH:"WITHDRAW",
	BUTTON_LANG_FORGOT:'Forgot password?',
	BUTTON_LANG_SIGNUP:'or create an account ',
	TEXT_LANG_HEADER:'ADD Money',
	TEXT_LANG_INVEST_L:'How much would you like to add ?',
	TEXT_LANG_INVEST1:'To optimize returns, we will add',
	TEXT_LANG_INVEST12:'to your investments',
	TEXT_LANG_EXPECTEDVALUE:'Expected Value in a year :',
	BUTTON_LANG_EN: ' Secure Login',
	signUpTitle:'Sign Up',
	firstName:'First Name',
	lastName:'Last Name',
	mobileNo:'Mobile Number',
	setPIN:'Set your password',
	confirmPin:'Confirm your password',
	referralCode:'Referral code(Optional)',
	activationText:'You will now need to activate your account. Please keep the following documents ready.',
	notNow:'NOT NOW',
	activateAcc:'ACTIVATE ACCOUNT',
	proof1:'PAN Card',
	proof2:'Address Proof',
	proof3:'Bank Account Number',
	proof4:'IFSC Code of your Bank account',
      TEXT_LANG_INVEST_TERMS_1:'By clicking ADD MONEY you agree to have read',
      TEXT_LANG_INVEST_TERMS_2:'before making the investment',
      TranscationID:'Transaction ID',
      TEXT_CURRENT_BALANCE:'CURRENT BALANCE ',
      TEXT_WIHTDRAW_BALANCE:'How much would you like to withdraw ?',
      TEXT_WITHDRAW_COMPLETEBALANCE:'Withdraw my complete balance',
      noTxnMsg1:'There are no transactions to display,',
      noTxnMsg12:'START INVESTING NOW',
      TEXT_INVITE_HEADER:'EDUCATE YOUR FRIENDS',
      TEXT_INVITE_HEADER2:'Educate Your Friends',
      TEXT_INVITE_MESSAGE1:'Earn Money In The Process',
      TEXT_INVITE_MESSAGE2:'Educate your peers and make money in the process. Use your mobile number as the referral code and invite as many friends as you wish to make use of FinoZen. You can earn upto Rs. 50,000 per month by educating your friends on FinoZen.',
      TEXT_INVITE_BUTTON:'Start Inviting',
      TEXT_LANG_MENU1:'Educate & Earn',
      TEXT_LANG_MENU2:'FAQ',
      TEXT_LANG_MENU3:'contact us',
      TEXT_LANG_MENU4:'About us',
      TEXT_LANG_MENU5:'Activate account',
      TEXT_LANG_MENU6:'Sign Out',
	withdrawlTimeBefore:'before 2 pm',
	withdrawlTimeAfter:'after 2 pm',
	dayAfter:'Next day',
	dayAfterNext:'Day after next',
	andText:'and',
	Withdrawal:'Withdrawal',
	deposit:'Deposit',
	withdrawBottomLine:'Working days Mon-Fri. If the day of credit is a Bank Holiday, money will be credited the next working day.',
	rememberMe:'Remember Me',
	fieldEmpty:'You did not enter a field',
	passwordInvalid:'Entered Password didn\'t match',
	passwordLength:'Password should have atleast 4 characters',
	mobileInvalid:'Enter valid mobile number',
	mobileLength:'Mobile number must be 10 digits.',
	credentialsInvalid:'Entered Credentials did not validate',
	resetPinError:'Please enter your mobile number to reset Password ',
	digitsOnly:'Enter digits only',
	signUpError:'Sign Up failed, please try again',
	mobileError:'Mobile number in use',
	statusHead:'status',
	statusRequest:'REQUEST STATUS',
	statusThanks:'Thank you',
	paymentSuccess1:'Your request has been accepted.',
	paymentSuccess2:'Schedule for deposit to your registered bank account',
	paymentSuccess3:'If the day of deposit is a Bank Holiday, money will be deposited the next working day.',
	paymentSuccessDone:'Done',
	investSuccess1:'Your request for investment has been accepted',
	alphaOnly:'Enter Alphabets only'
  });

  $translateProvider.preferredLanguage('2');
})

.run(function($ionicPlatform, $rootScope, $ionicLoading,Idle, $ionicHistory,$cordovaKeyboard,$cordovaSocialSharing,$state,$ionicPopup,$sessionStorage,ionicToast,$timeout,$localStorage) {
  $ionicPlatform.ready(function() {

  /*
  $rootScope.$watch(function() {
  return $cordovaKeyboard.isVisible();
}, function(value) {
	console.log(value);
$rootScope.keyboardOpen = value;
}); */

//$localStorage.language=0;


                if(!navigator.onLine) {
console.log(navigator.onLine + "  connection state");
                  // all details are for
					$ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(result) {
                            ionic.Platform.exitApp();
                        }
                    });
				}
				else{console.log(navigator.onLine + "  connection state");}

	var backbutton = 0;
	$ionicPlatform.registerBackButtonAction(function (event) {
     if ($ionicHistory.currentStateName() == 'invest'){
		 console.log("inv");
		$state.go('tabsController.summaryPage');
      }
     else if ($ionicHistory.currentStateName() == 'verifySuccess' || $ionicHistory.currentStateName() == 'questions' || $ionicHistory.currentStateName() == 'bank' || $ionicHistory.currentStateName() == 'sliders'){
		event.preventDefault();
      }

     else if ($ionicHistory.currentStateName() == 'tabsController.summaryPage'){
		/*var showToast = function(){
		//ionicToast.show(message, position, stick, time);
		  ionicToast.show('This is a toast at the top.', 'bottom', false, 2500);
		};*/
		if(backbutton==0){
            backbutton++;
            window.plugins.toast.showShortBottom('Press back again to exit');
            $timeout(function(){backbutton=0;},3000);
        }else{
            navigator.app.exitApp();
        }

      }
	   else if ($ionicHistory.currentStateName() == 'login'){
		navigator.app.exitApp();
      }

	  else {
		console.log($ionicHistory.currentStateName());
        history.go(-1);
      }
    }, 100);

   
	
//clevertap integration
    CleverTap.registerPush(); //registering for push notifications
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('onCleverTapProfileSync', this.onCleverTapProfileSync, false); // optional: to be notified of CleverTap user profile synchronization updates
    document.addEventListener('onCleverTapProfileDidInitialize', this.onCleverTapProfileDidInitialize, false); // optional, to be notified when the CleverTap user profile is initialized
    document.addEventListener('onCleverTapInAppNotificationDismissed', this.onCleverTapInAppNotificationDismissed, false); // optional, to be receive a callback with custom in-app notification click data
    document.addEventListener('onDeepLink', this.onDeepLink, false); // optional, register to receive deep links.
    document.addEventListener('onPushNotification', this.onPushNotification, false); // optional, register to receive push notification payloads.



    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }



if(typeof analytics !== undefined) {
                analytics.startTrackerWithId("UA-78900035-2");
				analytics.trackView("tracking the google analytics ");
  analytics.trackView("controller.js");
    analytics.trackView('invest');
  analytics.trackView('withdraw');
  analytics.trackView('tabsController');
  analytics.setUserId('userName');
  analytics.setApplicationIconBadgeNumber('username');

				//ga('set', 'userId', {{USER_ID}}); // Set the user ID using signed-in user_id.
            } else {
                console.log("Google Analytics Unavailable");
            }
  });
})

