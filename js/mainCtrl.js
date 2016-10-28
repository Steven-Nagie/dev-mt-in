angular.module('devMtnSocial')
.controller('mainCtrl', function($scope, updateProfile, friendService, strangerService){

  $scope.users = [];
  $scope.friends = friendService.friends;
  $scope.strangers = [];

  // Calls the promise, sets my strangers array equal to the returned value, then splices out any data that don't contain valid urls for images. I made sure to do the same thing for 'description', which serves as the bio.
  $scope.getHeroes = function() {
    var strangers = [];
    strangerService.getHeroes().then(function(response) {
      $scope.strangers = response.data.data.results;
      for (var i = $scope.strangers.length - 1; i >= 0; i--) {
        if ($scope.strangers[i].thumbnail.path.includes("not") || !$scope.strangers[i].description) {
          $scope.strangers.splice(i, 1);
        }
      }
      localStorage.setItem('strangersList', JSON.stringify($scope.strangers));

      console.log($scope.strangers);
    });
  };

  // When we first boot up, this will grab the Marvel api for us. Because the Marvel api stores thing on local storage, this also tests if we have already done it, and if we have, we don't bother doing it again, we just pull the stuff from local storage. This helps keep our calls to the api down.
  if (localStorage.strangersList) {
    $scope.strangers = JSON.parse(localStorage.getItem('strangersList'));
    console.log($scope.strangers);
  } else {
    $scope.getHeroes();
  }



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
    // The following creates a variable containing the image of the latest user, which we then push into the bottom triangle using ng-style.
    $scope.userImage = "url(" + $scope.users[$scope.users.length - 1].img + ")";
    // This does a little bit of styling, so we can get rid of some of the text in our ng-click event on the Save Changes input button
    $scope.signUpHidden = true;
    $scope.userProfileHidden = false;
    $scope.trianglePhoto = {'background-image': $scope.userImage};
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
  };


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


    // These variables are all used as true/false toggles for adding classes to divs during the change between different pages.
    $scope.signUpHidden = false;
    $scope.userProfileHidden = true;
    $scope.trianglesHidden = false;
    $scope.updateHidden = true;
    $scope.friendsHidden = true;
    $scope.findHidden = true;
    $scope.friendProfileHidden = true;
    $scope.strangerProfileHidden = true;

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
    console.log($scope.friendsHidden);
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

  $scope.showStrangerProfile = function(stranger) {
    $scope.currentStranger = stranger;
    $scope.strangerProfileHidden = false;
    $scope.userProfileHidden = true;
    $scope.findHidden = true;
    $scope.trianglesHidden = false;
    $scope.friendProfileHidden = true;
    $scope.signUpHidden = true;
    // $scope.trianglePhoto = {'background-image': $scope.userImage};
    $scope.trianglePhoto = {'background-image': 'url(' + stranger.thumbnail.path + '.jpg)'};
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
    $scope.trianglePhoto = {'background-image': 'url(' + friend.img + ')'};
  };

});
