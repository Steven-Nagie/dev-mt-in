angular.module('devMtnSocial')
.controller('mainCtrl', function($scope, updateProfile){
  $scope.users = [];



  // All the stuff contained here is for saving user profiles to the local storage.
  if (localStorage.list) {
    $scope.users = JSON.parse(localStorage.getItem('list'));
    console.log($scope.users);
  }
  // *************************************

  $scope.addNewUser = function(newName, newTag, newImg, newBio) {
    $scope.users.push({name: newName, tag: newTag, img: newImg, bio: newBio});
    // This line immediately pushes any new user profiles to the local storage
    localStorage.setItem('list', JSON.stringify($scope.users));
    console.log($scope.users);
  };

  $scope.changeUser = function(newName, newTag, newImg, newBio) {
    var userList = $scope.users;
    if (newName) {
      userList[userList.length - 1].name = newName;
    } else if (newTag) {
      userList[userList.length - 1].tag = newTag;
    } else if (newImg) {
      userList[userList.length - 1].img = newImg;
    } else if (newBio) {
      userList[userList.length - 1].bio = newBio;
    }
    $scope.users = userList;
    localStorage.setItem('list', JSON.stringify($scope.users));
    $scope.userImage = "url(" + $scope.users[$scope.users.length - 1].img + ")";
    console.log($scope.users);
  };

  // These variables are all used as true/false toggles for adding classes to divs during the change between different pages.
  $scope.signUpHidden = false;
  $scope.userProfileHidden = true;
  $scope.trianglesHidden = false;
  $scope.updateHidden = true;
  $scope.friendsHidden = true;

  // The following creates a variable containing the image of the latest user, which we then push into the bottom triangle using ng-style.
  $scope.userImage = "url(" + $scope.users[$scope.users.length - 1].img + ")";
});
