angular.module('devMtnSocial')
.controller('mainCtrl', function($scope, updateProfile, friendService, strangerService){
  $scope.users = [];
  $scope.friends = friendService.friends;
  $scope.strangers = strangerService.strangers;

  // All the stuff contained here is for saving user profiles to the local storage.
  if (localStorage.list) {
    $scope.users = JSON.parse(localStorage.getItem('list'));
    console.log($scope.users);
  }
  // *************************************

  $scope.addNewUser = function(newName, newTag, newImg, newBio, newFriends) {
    $scope.users.push({name: newName, tag: newTag, img: newImg, bio: newBio, friends: $scope.friends});
    // This line immediately pushes any new user profiles to the local storage
    localStorage.setItem('list', JSON.stringify($scope.users));
    // The following creates a variable containing the image of the latest user, which we then push into the bottom triangle using ng-style.
    $scope.userImage = "url(" + $scope.users[$scope.users.length - 1].img + ")";
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
  $scope.findHidden = true;

  // It was working well to just use friendsHidden = !friendsHidden, until there were more than two possibilities per location.
  // What's below is a really cool thing that will show the div you want upon first click, but upon second click will set everything right back to the way it was. However, I realized from a user perspective that wasn't the most friendly possible option.
  // $scope.hiddenState = {triangles: '', find: '', friends: '', update: ''};
  // $scope.showFriends = function() {
  //   if ($scope.friendsHidden) {
  //     $scope.hiddenState.triangles = $scope.trianglesHidden;
  //     $scope.hiddenState.find = $scope.findHidden;
  //     $scope.hiddenState.friends = $scope.friendsHidden;
  //     $scope.hiddenState.update = $scope.updateHidden;
  //     $scope.friendsHidden = false;
  //     $scope.trianglesHidden = true;
  //     $scope.findHidden = true;
  //     $scope.updateHidden = true;
  //   } else {
  //     $scope.friendsHidden = $scope.hiddenState.friends;
  //     $scope.trianglesHidden = $scope.hiddenState.triangles;
  //     $scope.findHidden = $scope.hiddenState.find;
  //     $scope.updateHidden = $scope.hiddenState.update;
  //   }
  // };
  //
  // $scope.showFind = function() {
  //   if ($scope.findHidden) {
  //     $scope.hiddenState.triangles = $scope.trianglesHidden;
  //     $scope.hiddenState.find = $scope.findHidden;
  //     $scope.hiddenState.friends = $scope.friendsHidden;
  //     $scope.hiddenState.update = $scope.updateHidden;
  //     $scope.findHidden = false;
  //     $scope.trianglesHidden = true;
  //     $scope.friendsHidden = true;
  //     $scope.updateHidden = true;
  //   } else {
  //     $scope.friendsHidden = $scope.hiddenState.friends;
  //     $scope.trianglesHidden = $scope.hiddenState.triangles;
  //     $scope.findHidden = $scope.hiddenState.find;
  //     $scope.updateHidden = $scope.hiddenState.update;
  //   }
  // };
  //
  // $scope.showUpdate = function() {
  //   if ($scope.updateHidden === true) {
  //     $scope.hiddenState.triangles = $scope.trianglesHidden;
  //     $scope.hiddenState.find = $scope.findHidden;
  //     $scope.hiddenState.friends = $scope.friendsHidden;
  //     $scope.hiddenState.update = $scope.updateHidden;
  //     $scope.findHidden = true;
  //     $scope.trianglesHidden = true;
  //     $scope.friendsHidden = true;
  //     $scope.updateHidden = false;
  //   } else {
  //     $scope.friendsHidden = $scope.hiddenState.friends;
  //     $scope.trianglesHidden = $scope.hiddenState.triangles;
  //     $scope.findHidden = $scope.hiddenState.find;
  //     $scope.updateHidden = $scope.hiddenState.update;
  //   }
  // };

  $scope.showFriends = function() {
    if ($scope.friendsHidden) {
      $scope.friendsHidden = false;
      $scope.findHidden = true;
      $scope.trianglesHidden = true;
      $scope.updateHidden = true;
    } else {
      $scope.friendsHidden = true;
      $scope.findHidden = true;
      $scope.trianglesHidden = false;
      $scope.updateHidden = true;
    }
  };

  $scope.showFind = function() {
    if ($scope.findHidden) {
      $scope.friendsHidden = true;
      $scope.findHidden = false;
      $scope.trianglesHidden = true;
      $scope.updateHidden = true;
    } else {
      $scope.friendsHidden = true;
      $scope.findHidden = true;
      $scope.trianglesHidden = false;
      $scope.updateHidden = true;
    }
  };

  $scope.showUpdate = function() {
    if ($scope.updateHidden) {
      $scope.friendsHidden = true;
      $scope.findHidden = true;
      $scope.trianglesHidden = true;
      $scope.updateHidden = false;
    } else {
      $scope.friendsHidden = true;
      $scope.findHidden = true;
      $scope.trianglesHidden = false;
      $scope.updateHidden = true;
    }
  };
});
