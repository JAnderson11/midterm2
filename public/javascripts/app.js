angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.comments = [];
    $scope.array = [];
    $scope.addComment = function() {
      var newcomment = {name:$scope.formContent1,upvotes:0,price:$scope.formContent2,image:$scope.formContent3};
      $scope.formContent='';
      $http.post('/comments', newcomment).success(function(data){
        $scope.comments.push(data);
      });
    };
    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes = data.upvotes;
        });
    };
	$scope.incrementUpvotes = function(comment) {
	  $scope.upvote(comment);
    };
    $scope.addUpvotes = function(){
       $scope.array = [];
       angular.forEach($scope.comments, function(comment){
         if(!!comment.selected) {
           $scope.array.push(comment);
           $http.put('/comments/' + comment._id + '/upvote').success(function(data){
             comment.upvotes = data.upvotes;
           })
         }
     });
   }
    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };
    $scope.getAll();

    $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        });
    };
  }
]);
