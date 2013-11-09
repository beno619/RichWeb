angular.module("Calendar",[])
	.controller("calendarCtrl",["$scope","$http",function($scope,$http){
	$scope.title = "My Calender"
	$scope.update = function() {
      if (!$scope.targetId) {
        $http.post('calendar/entries', {text: $scope.date , where: $scope.where , what: $scope.what, time: $scope.time})
          .success(function(data, status, headers, config) {
            $scope.messages.unshift(data);
            $scope.date = "";
          });

		 }
		 else
		 {
	        $http.put('calendar/entries/' + $scope.targetId, {where: $scope.where , what: $scope.what})
	          .success(function(data, status, headers, config) 
	          {
	            var i;
	            for (i = 0; i < $scope.messages.length; i++) 
	            {
	              if ($scope.messages[i]._id === $scope.targetId) 
	              {
	              	$scope.messages[i].text = $scope.date;
	                $scope.messages[i].where = $scope.where;
	                $scope.messages[i].what = $scope.what;
	                $scope.messages[i].time = $scope.time;
	                break
	              }
	            }
	            $scope.targetId = null;
	            $scope.date = "";
	            $scope.where = "";
	            $scope.what = "";
	            $scope.time = "";
	          });
	      };

		};
		$scope.edit = function(index) {
	      var message = $scope.messages[index];
	      $scope.date = message.text;
	      $scope.where = message.where;
	      $scope.what = message.what;
	      $scope.time = message.time;
	      $scope.targetId = message._id;
	    };

		$scope.remove = function(index) {
      	$http.delete('/calendar/entries/' + $scope.messages[index]._id)
          .success(function(data, status, headers, config) {
            $scope.messages.splice(index, 1);
           })
        };
		// On Inital page load
		$http.get('/calendar/entries')
		  .success(function(data,status,headers,config){
		  	$scope.messages = data;
		  })
	}]);