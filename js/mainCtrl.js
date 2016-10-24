angular.module('devMtnSocial')
.controller('mainCtrl', function($scope){
  $scope.users = [];

  if (localStorage.list) {
    $scope.users = JSON.parse(localStorage.getItem('list'));
    console.log($scope.users);
  }

  $scope.addNewUser = function(newName, newTag, newImg, newBio) {
    $scope.users.push({name: newName, tag: newTag, img: newImg, bio: newBio});
    localStorage.setItem('list', JSON.stringify($scope.users));
    console.log($scope.users);
  };

  $scope.signUpHidden = false;
  $scope.userProfileHidden = true;

});
