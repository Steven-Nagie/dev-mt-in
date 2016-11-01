angular.module('devMtnSocial')
.controller('mainCtrl', function($scope, updateProfile, friendService, strangerService){

  $scope.users = [];
  $scope.friends = friendService.friends;
  $scope.strangers = [];

  var go = 0;

  // Calls the promise, sets my strangers array equal to the returned value, then splices out any data that don't contain valid urls for images. I made sure to do the same thing for 'description', which serves as the bio.
  // $scope.getStrangers = function() {
  //   var strangers = [];
  //   strangerService.getStrangers().then(function(response) {
  //     $scope.strangers = response.data.data.results;
  //     for (var i = $scope.strangers.length - 1; i >= 0; i--) {
  //       if ($scope.strangers[i].thumbnail.path.includes("not") || !$scope.strangers[i].description) {
  //         $scope.strangers.splice(i, 1);
  //       }
  //     }
  //     localStorage.setItem('strangersList', JSON.stringify($scope.strangers));
  //
  //     console.log($scope.strangers);
  //   });
  // };
  $scope.getStrangers = function() {
    strangerService.getStrangers().then(function(response) {
      $scope.strangers = response;

      localStorage.setItem('strangersList', JSON.stringify($scope.strangers));

      console.log($scope.strangers);
    });
  };

  // When we first boot up, this will grab the Marvel api for us. Because the Marvel api stores thing on local storage, this also tests if we have already done it, and if we have, we don't bother doing it again, we just pull the stuff from local storage. This helps keep our calls to the api down.
  if (localStorage.strangersList) {
    $scope.strangers = JSON.parse(localStorage.getItem('strangersList'));
  } else {
    $scope.getStrangers();
  }







  $scope.addNewUser = function(newName, newTag, newImg, newBio, newFriends) {
    $scope.users.push({name: newName, tag: newTag, img: 'url(' + newImg + '.jpg)', bio: newBio, friends: $scope.friends});
    // This line immediately pushes any new user profiles to the local storage
    localStorage.setItem('list', JSON.stringify($scope.users));
    // The following creates a variable containing the image of the latest user, which we then push into the bottom triangle using ng-style.
    $scope.userImage = $scope.users[$scope.users.length - 1].img;
    console.log($scope.users);
    // This does a little bit of styling, so we can get rid of some of the text in our ng-click event on the Save Changes input button
    $scope.signUpHidden = true;
    $scope.userProfileHidden = false;
    $scope.trianglePhoto = {'background-image': $scope.userImage};
    $scope.userThumbnail = false;
    $scope.upperLeftSearch = true;
    $scope.upperRightSearch = false;
    $scope.menuHide = true;
    // This sets our "currentUser" to the last value in the array.
    $scope.currentUser = $scope.users[$scope.users.length - 1];
    go++;
  };

  $scope.changeUser = function(newName, newTag, newImg, newBio) {
    var userList = $scope.users;
    if (newName) {
      userList[userList.length - 1].name = newName;
    }

    if (newTag) {
      userList[userList.length - 1].tag = newTag;
    }

    if (newImg) {
      userList[userList.length - 1].img = newImg;
    }

    if (newBio) {
      userList[userList.length - 1].bio = newBio;
    }
    $scope.users = userList;
    localStorage.setItem('list', JSON.stringify($scope.users));
    $scope.userImage = "url(" + $scope.users[$scope.users.length - 1].img + ")";
    $scope.updateHidden = !$scope.updateHidden;
    $scope.trianglesHidden = !$scope.trianglesHidden;
    $scope.trianglePhoto = {'background-image': $scope.userImage};
    console.log($scope.users);
    $scope.currentUser = $scope.users[$scope.users.length - 1];
  };

  $scope.addFriend = function(input) {
    $scope.currentUser.friends.unshift(input);
    var i = $scope.strangers.indexOf(input);
    $scope.strangers.splice(i, 1);
  };

  $scope.friendSearch = function(input) {
    strangerService.getStrangersSpecific(input);
  };

    // These variables are all used as true/false toggles for adding classes to divs during the change between different pages.
    $scope.signUpHidden = false;
    $scope.userProfileHidden = true;
    $scope.trianglesHidden = false;
    $scope.updateHidden = true;
    $scope.friendsHidden = true;
    $scope.findHidden = true;
    $scope.friendProfileHidden = true;
    $scope.strangerProfileHidden = true;
    $scope.upperLeftSearch = false;
    $scope.backArrow = true;
    $scope.userThumbnail = true;
    $scope.upperRightSearch = true;
    $scope.menuHide = false;

  $scope.showFriends = function() {
    if ($scope.friendsHidden) {
      $scope.friendsHidden = false;
      $scope.backArrow = false;
      $scope.upperLeftSearch = true;
      $scope.userThumbnail = true;
      $scope.findHidden = true;
      $scope.trianglesHidden = true;
      $scope.updateHidden = true;
      $scope.menuHide = false;
      $scope.upperRightSearch = true;
      $scope.friendsUnderlineDiv = {'border-bottom': '4px solid #00ffe9'};
      $scope.strangersUnderlineDiv = {'border-bottom': 'none'};
      $scope.updateUnderlineDiv = {'border-bottom': 'none'};
    } else {
      $scope.friendsHidden = true;
      $scope.backArrow = true;
      $scope.userThumbnail = false;
      $scope.findHidden = true;
      $scope.trianglesHidden = false;
      $scope.updateHidden = true;
      $scope.menuHide = true;
      $scope.upperRightSearch = false;
      $scope.friendsUnderlineDiv = {'border-bottom': 'none'};
    }
  };

  $scope.showFind = function() {
    if ($scope.findHidden) {
      $scope.friendsHidden = true;
      $scope.backArrow = false;
      $scope.upperLeftSearch = true;
      $scope.userThumbnail = true;
      $scope.findHidden = false;
      $scope.trianglesHidden = true;
      $scope.updateHidden = true;
      $scope.menuHide = false;
      $scope.upperRightSearch = true;
      $scope.friendsUnderlineDiv = {'border-bottom': 'none'};
      $scope.strangersUnderlineDiv = {'border-bottom': '4px solid #00ffe9'};
      $scope.updateUnderlineDiv = {'border-bottom': 'none'};
    } else {
      $scope.friendsHidden = true;
      $scope.backArrow = true;
      $scope.userThumbnail = false;
      $scope.findHidden = true;
      $scope.trianglesHidden = false;
      $scope.updateHidden = true;
      $scope.menuHide = true;
      $scope.upperRightSearch = false;
      $scope.strangersUnderlineDiv = {'border-bottom': 'none'};
    }
  };

  $scope.showUpdate = function() {
    if ($scope.updateHidden) {
      $scope.friendsHidden = true;
      $scope.backArrow = false;
      $scope.upperLeftSearch = true;
      $scope.userThumbnail = true;
      $scope.findHidden = true;
      $scope.trianglesHidden = true;
      $scope.updateHidden = false;
      $scope.menuHide = false;
      $scope.upperRightSearch = true;
      $scope.friendsUnderlineDiv = {'border-bottom': 'none'};
      $scope.strangersUnderlineDiv = {'border-bottom': 'none'};
      $scope.updateUnderlineDiv = {'border-bottom': '4px solid #00ffe9'};
    } else {
      $scope.friendsHidden = true;
      $scope.backArrow = true;
      $scope.userThumbnail = false;
      $scope.findHidden = true;
      $scope.trianglesHidden = false;
      $scope.updateHidden = true;
      $scope.menuHide = true;
      $scope.upperRightSearch = false;
      $scope.updateUnderlineDiv = {'border-bottom': 'none'};
    }
  };

  $scope.showStrangerProfile = function(stranger) {
    $scope.currentStranger = stranger;
    $scope.backArrow = false;
    $scope.upperLeftSearch = true;
    $scope.userThumbnail = true;
    $scope.strangerProfileHidden = false;
    $scope.userProfileHidden = true;
    $scope.findHidden = true;
    $scope.trianglesHidden = false;
    $scope.friendProfileHidden = true;
    $scope.signUpHidden = true;
    // $scope.trianglePhoto = {'background-image': $scope.userImage};
    $scope.trianglePhoto = {'background-image': stranger.img};
    console.log($scope.trianglePhoto);
  };

  $scope.showFriendProfile = function(friend) {
      $scope.currentFriend = friend;
      $scope.friendProfileHidden = false;
      $scope.userProfileHidden = true;
      $scope.friendsHidden = true;
      $scope.trianglesHidden = false;
      $scope.strangerProfileHidden = true;
      $scope.signUpHidden = true;
      $scope.trianglePhoto = {'background-image': friend.img};
  };

  $scope.returnToMain = function() {
    $scope.userProfileHidden = false;
    $scope.signUpHidden = true;
    $scope.trianglesHidden = false;
    $scope.updateHidden = true;
    $scope.friendsHidden = true;
    $scope.findHidden = true;
    $scope.friendProfileHidden = true;
    $scope.strangerProfileHidden = true;
    $scope.upperLeftSearch = true;
    $scope.backArrow = true;
    $scope.userThumbnail = false;
    $scope.upperRightSearch = false;
    $scope.menuHide = true;
    $scope.trianglePhoto = {'background-image': $scope.currentUser.img};
    $scope.friendsUnderlineDiv = {'border-bottom': 'none'};
    $scope.strangersUnderlineDiv = {'border-bottom': 'none'};
    $scope.updateUnderlineDiv = {'border-bottom': 'none'};
  };

  // All the stuff contained here is for saving user profiles to the local storage.
  if (localStorage.list) {
    $scope.users = JSON.parse(localStorage.getItem('list'));
    $scope.currentUser = $scope.users[$scope.users.length - 1];
    $scope.returnToMain();
  }
  // *************************************



});
