angular.module('starter.services', [])


.factory('scannerFactory', function($http,$q, $localStorage) {
    return {
		postJuice: function (token, juice) {
			var deferred = $q.defer ();
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

		getJuice: function (token, juice) {
			var deferred = $q.defer ();
			var url = 'https://www.gingerwald.com/community/v2.1/api/getBottleDetails.php?token=' + token + '&bottle_token=' + juice;
      		$http.post(url)
      		.success (function (response) {
        		deferred.resolve (response);
		    })
		    .error (function (response) {
		    	deferred.reject (response);
		    });

			return deferred.promise;
		},
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
            var deferred = $q.defer();
            var params = {
            grant_type:'password',
            username:'plantijn006@gingerwald.be',
            password:'gingerjuice',
            client_id:'GingerwaldUserApp15',
            client_secret:'WlKGlWfcqVlE5i4OdgxxOQv1ePMgroFe7PQn9JTvq6DW6Dfpy3fKDeaMwAQXVmag'
    };
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
            }};
            var url = "https://www.gingerwald.com/community/v2.1/authorization/oauth/token.php";
            params = JSON.stringify(params);
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
        },
         logout: function(success) {
                delete $localStorage.token;
                success();
            }
    }
})

