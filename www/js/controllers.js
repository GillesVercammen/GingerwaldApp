angular.module('starter.controllers', [])

// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
.controller("GraphCtrl", function($scope, $localStorage, dashFactory) {
    
    $localStorage.newArrayIngredients = [];
    
    //Get the dashboard data
    dashFactory.getDashboard($localStorage.token)
        .then(function(response){  
            $localStorage.response = response.Ingredients;         
            $localStorage.arrayIngredients = response.Ingredients;    
        },function(error){
            console.log(error);
        })

    //Put amounts in array
        for(i = 0; i < $localStorage.arrayIngredients.length; i++) {
                $localStorage.arrayIngredients[i] =  $localStorage.arrayIngredients[i].Ingredient.Amount_g;
           }

    //Sorth the array 
        console.log($localStorage.arrayIngredients);
         for (i = 0; i < $localStorage.arrayIngredients.length - 1; i++) {
                for (j = i + 1; j < $localStorage.arrayIngredients.length; j++) {
                     if ($localStorage.arrayIngredients[i] < $localStorage.arrayIngredients[j]) 
                     {
                            $scope.temp = $localStorage.arrayIngredients[j];
                            $localStorage.arrayIngredients[j] = $localStorage.arrayIngredients[i];
                            $localStorage.arrayIngredients[i] = $scope.temp;
                    }
                } 
            }  

     //take 5 first elements because those are the highest amounts
       $scope.highest = $localStorage.arrayIngredients[0];
       $scope.secondHighest = $localStorage.arrayIngredients[1];
       $scope.thirdHighest = $localStorage.arrayIngredients[2];
       $scope.fourthHighest = $localStorage.arrayIngredients[3];
       $scope.fifthHighest = $localStorage.arrayIngredients[4];

     // INGREDIENT NAME FOR TOP 5 AMOUNTS

       for(i = 0; i < $localStorage.response.length; i++) {
           switch ($localStorage.response[i].Ingredient.Amount_g) {
               case $scope.highest:
                   $scope.highestIngredient = $localStorage.response[i].Ingredient.Name;
                   break;
                case $scope.secondHighest:
                    $scope.secondHighestIngredient = $localStorage.response[i].Ingredient.Name;
                    break;
                case $scope.thirdHighest:
                    $scope.thirdHighestIngredient = $localStorage.response[i].Ingredient.Name;
                    break;
                case $scope.fourthHighest:
                    $scope.fourthHighestIngredient = $localStorage.response[i].Ingredient.Name;
                    break;
                case $scope.fifthHighest:
                    $scope.fifthHighestIngredient = $localStorage.response[i].Ingredient.Name;
                    break;
               default:
                   break;
           }
       }

       //Graph info
        $scope.myDataSource = {
                chart: {
                    caption: "Ingredients",
                    subCaption: "Top 5 ingredients in last month",
                },
                data:[{
                    label: $scope.highestIngredient,
                    value: $scope.highest
                },
                {
                    label: $scope.secondHighestIngredient,
                    value: $scope.secondHighest
                },
                {
                    label:  $scope.thirdHighestIngredient,
                    value:  $scope.thirdHighest
                },
                {
                    label: $scope.fourthHighestIngredient,
                    value: $scope.fourthHighest
                },
                {
                    label: $scope.fifthHighestIngredient,
                    value: $scope.fifthHighest
                }]
              };
    
})

//show dashboard info
.controller('DashCtrl', function($scope, $localStorage, dashFactory) {
  $scope.listOfIngredients = [];
  $scope.amountOfIngredients = [];
  $scope.listOfNutrients = [];
  $scope.amountOfNutrients = [];
  $scope.amountofShots = [];
   dashFactory.getDashboard($localStorage.token)
   .then(function(response){
     $scope.listOfIngredients = response.Ingredients;
     $scope.amountOfIngredients = response.Ingredients;
     $scope.listOfNutrients = response.Nutrients;
     response.Ingredients[5].Ingredient.Name = "Apple"; //green apple to long for column.
     $scope.amountOfNutrients = response.Nutrients;
     $scope.amountofShots = response.Shots.length;
   }, function(error){
     console.log(error)
   })


})


.controller('ScannerCtrl', 
function ($scope, $stateParams, $cordovaBarcodeScanner, scannerFactory, $window, $localStorage, $ionicPopup, $state) {
    //https://www.thepolyglotdeveloper.com/2014/09/implement-barcode-scanner-using-ionic-framework/
    //voorbeeld url: http://qr.gingerwald.com?b=3DJ3DnJxtSem6W
    //last part = code
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            //token for testing, currently data not showing without switching screen some times.
            $localStorage.qrUrl = imageData.text;
            $localStorage.splitted = $localStorage.qrUrl.split('=');
            $localStorage.qrToken = $localStorage.splitted[1];
            $state.reload();
        }, function(error) {
            console.log("An error happened : " + error);
        });
    };
    $scope.tokenqr = $localStorage.qrToken;
    scannerFactory.getBottleDetails($localStorage.token, $localStorage.qrToken)
        .then(function(response){
            $localStorage.juice = response.Bottle.JuiceID;
        })
    scannerFactory.getJuiceDetails($localStorage.token, $localStorage.juice)
        .then(function(response){
            $scope.juiceName = response.Juice.Name;
            $scope.JuiceDescription = response.Juice.Description;
            $scope.JuiceAmount = response.Juice.Amount_ml;
        })
    scannerFactory.getJuicePicture($localStorage.token, $localStorage.juice)
        .then(function(response) {
            $scope.juicePicture = response
        })
    $scope.addToDash = function() {
        scannerFactory.addToDash($localStorage.token, $localStorage.qrToken)
            .then(function(response){
                console.log($localStorage.qrToken)
                 $localStorage.qrToken = '';
                 $localStorage.juice = '';
                 console.log($localStorage.qrToken)
                var myPopup = $ionicPopup.alert({
                        title: 'Added to dash', // String. The title of the popup.
                        cssClass: 'popup', // String, The custom CSS class name
                        template: 'Your juice has been added to your dashboard', // String (optional). The html template to place in the popup body.
                        okText: 'Ok', // String (default: 'OK'). The text of the OK button.
                        okType: 'button-balanced', // String (default: 'button-positive'). The type of the OK button.
                    })
               
            }, function(error) {
                console.log($localStorage.qrToken)
                $localStorage.qrToken = '';
                $localStorage.juice = '';
                console.log($localStorage.qrToken)
                var myPopup = $ionicPopup.alert({
                        title: 'Error occured', // String. The title of the popup.
                        cssClass: 'popup', // String, The custom CSS class name
                        template: 'You already added this juice', // String (optional). The html template to place in the popup body.
                        okText: 'Ok', // String (default: 'OK'). The text of the OK button.
                        okType: 'button-balanced', // String (default: 'button-positive'). The type of the OK button.
                    })
                    console.log($localStorage.qrToken)
                
            })
    }
})


.controller('BrowseCtrl', function($scope, $localStorage, userFactory){
    userFactory.getUserDetails($localStorage.token)
    .then(function(response){
      $scope.firstName = response.User.FirstName;
      $scope.lastName = response.User.LastName;
      $scope.uniqueKey = response.User.Login;
    }, function(error) {
      $scope.firstName = '';
      $scope.lastName = '';
      console.log(error);
    })
})


.controller('AppCtrl', function($scope, $ionicModal, $localStorage, $state) {
          $scope.logout = function() {
              //Reset all localstorage
                $localStorage.$reset();
                console.log("token" + $localStorage.token);
                $state.go("login")
             };
})


//login auth tutorial: https://www.peterbe.com/plog/promises-with-$http
//https://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543
.controller('LoginCtrl', function($scope, $state, $localStorage, loginFactory, $ionicPopup) {
   $scope.data = {};
      
    $scope.login = function() {
     //test BAD REQUEST 400 console.log(email, password)
      loginFactory.login($scope.data.email, $scope.data.password)
      .then(function(response){
        $localStorage.token = response.access_token;
        $state.go("app.browse")
      }, function(error) {
          console.log(error);
          var myPopup = $ionicPopup.alert({
            title: 'Error occured', // String. The title of the popup.
            cssClass: 'popup', // String, The custom CSS class name
            template: 'Login information is not correct', // String (optional). The html template to place in the popup body.
            okText: 'Try again', // String (default: 'OK'). The text of the OK button.
            okType: 'button-balanced', // String (default: 'button-positive'). The type of the OK button.
          })
          $scope.data.email = '';
          $scope.data.password = '';
          
      } );
      $scope.goToScanner = function(){
        $state.go("app.scanner")
      }

    }
});
