angular.module('starter.services', [])


.factory('scannerFactory', function($http,$q, $localStorage) {
    return {
		addToDash: function (token, juice) {
			var deferred = $q.defer();
			var url = 'https://www.gingerwald.com/community/v2.1/api/addBottleToDashboard.php?token=' + token + '&bottle_token=' + juice;	
      		$http.post(url)
      		.success (function (response) {
        		deferred.resolve (response);
		    })
		    .error (function (response) {
		    	deferred.reject (response);
		    });
			return deferred.promise;
		},

		getBottleDetails: function (token, qrToken) {
			var deferred = $q.defer();
			var url = 'https://www.gingerwald.com/community/v2.1/api/getBottleDetails.php?token=' + token + '&bottle_token=' + qrToken;
      		$http.post(url)
      		.success (function (response) {
        		deferred.resolve (response);
		    })
		    .error (function (response) {
		    	deferred.reject (response);
		    });

			return deferred.promise;
		},

        getJuiceDetails: function (token, juiceId) {
			var deferred = $q.defer();
			var url = 'https://www.gingerwald.com/community/v2.1/api/getJuiceDetails.php?token=' + token + '&juice_id=' + juiceId;
      		$http.post(url)
      		.success (function (response) {
        		deferred.resolve (response);
		    })
		    .error (function (response) {
		    	deferred.reject (response);
		    });

			return deferred.promise;
	    },
        /* This is giving me an error:
            XMLHttpRequest cannot load https://www.gingerwald.com/community/v2.1/api/getJuicePicture.php?token=4sXmUqA2H0ZPROnmk6PJ3laKboOImTCtVQZSpIny7IIGWsOp7EjXjLcbRDr1H2BB&juice_id=33. 
            No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8100' is therefore not allowed access.
        */
        getJuicePicture: function (token, juiceId) {
			var deferred = $q.defer();
			var url = 'https://www.gingerwald.com/community/v2.1/api/getJuicePicture.php?token=' + token + '&juice_id=' + juiceId;
      		$http.post(url)
      		.success (function (response) {
        		deferred.resolve (response);
		    })
		    .error (function (response) {
		    	deferred.reject (response);
		    });

			return deferred.promise;
	    }
    }
})
.factory('dashFactory', function($http, $q, $localStorage){
    return {
        getDashboard: function(token) {
            var deferred = $q.defer();
            // volgens /api/getJuiceIngredients.php
            var url = 'https://www.gingerwald.com/community/v2.1/api/getUserDashboard.php?token='
            $http.get(url + token) 
                .success(function(response){
                    deferred.resolve(response)
                })
                .error(function(response,status){
                    deferred.reject(response);
                })
                return deferred.promise;                
            }
        }
    }
)

.factory('userFactory', function($http,$q, $localStorage){
    return {
        getUserDetails: function(token){
            var deferred = $q.defer();
            // volgens /api/getUserDetails.php
            var url = 'https://www.gingerwald.com/community/v2.1/api/getUserDetails.php?token='
                $http.get(url + token)
                .success(function(response){
                    deferred.resolve(response)
                })
                .error(function(response,status){
                    deferred.reject(response);
                })
                return deferred.promise;
        }
    }
})
//login auth tutorial: https://www.peterbe.com/plog/promises-with-$http
//https://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543
.factory('loginFactory',  function($http, $q, $localStorage){        
    return {
        login: function(email, password) {

        /* Niet werkende code , zowel met aparte variabelen, als met de data direct mee te geven en andere mogelijkheden...

        1. $http.post(url,data,config) waarbij
            var data = {
                grant_type: 'password',
                username: email,
                password: password,
                client_id: 'GingerwaldUserApp15',
                client_secret: 'WlKGlWfcqVlE5i4OdgxxOQv1ePMgroFe7PQn9JTvq6DW6Dfpy3fKDeaMwAQXVmag'
                };
            
         2.  $http({
                method: 'POST',
                url: url,
                data: data, 
                header: 'Content-Type': 'application/x-www-form-urlencoded'
                })
        */
            var deferred = $q.defer();
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
            }};
            var url = "https://www.gingerwald.com/community/v2.1/authorization/oauth/token.php";
            $http.post(url, "username=" + encodeURIComponent(email) + 
                            "&password=" + encodeURIComponent(password) + 
                            "&grant_type=password" +
                            "&client_id=GingerwaldUserApp15" +
                            "&client_secret=WlKGlWfcqVlE5i4OdgxxOQv1ePMgroFe7PQn9JTvq6DW6Dfpy3fKDeaMwAQXVmag", config)
                .success(function(respons){
                    deferred.resolve(respons);
                })
                .error(function(respons,status) {
                    deferred.reject(respons);
                    console.log()
                })
                return deferred.promise;
        }
    }
})

