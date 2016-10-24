angular.module('devMtnSocial')
.controller('mainCtrl', function($scope){
  $scope.users = [];

  $scope.addNewUser = function(newName, newTag, newImg, newBio) {
    $scope.users.push({name: newName, tag: newTag, img: newImg, bio: newBio});
    console.log($scope.users);
  };

  $scope.signUpHidden = false;
  $scope.userProfileHidden = true;

});
