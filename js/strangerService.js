angular.module('devMtnSocial').service('strangerService', function($http, $q) {
  this.strangers = [];

  // ******These were my first attempts to access and properly format the data from the Marvel api. They were messy, obviously, but they sort of worked. I keep them here for future reference.
  // setTimeout(function() {this.strangers = strangers; console.log("this is this.strangers:" + this.strangers);}, 2000);

  // this.getStrangers = function() {
  //   var deferObj = $q.defer();
  //   $http({
  //     method: 'GET',
  //     url: 'https://gateway.marvel.com:443/v1/public/characters?apikey=663fb1c634171cbd6e99378697d414eb'
  //   }).then(function(response) {
  //     deferObj.resolve(response.data.data.results);
  //   });
  //   return deferObj.promise;
  // };


  // this.getStrangers = function() {
  //   return $http({
  //     method: 'GET',
  //     url: 'https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=663fb1c634171cbd6e99378697d414eb'
  //   });
  // };

  // I put in the spider name search criteria, so watch out for that.
  this.getStrangers = function() {
    var deferObj = $q.defer();
    $http({
      method: 'GET',
      url: 'https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=663fb1c634171cbd6e99378697d414eb'
    }).then(function(response) {
      var parsedResults = [];
      var strangers = response.data.data.results;
      for (var i = strangers.length - 1; i >= 0; i--) {
        if (strangers[i].thumbnail.path.includes("not") || !strangers[i].description) {
          strangers.splice(i, 1);
          continue;
        }
        parsedResults.unshift({name: strangers[i].name, tag: "He's a maniac on the floor", bio: strangers[i].description, img: 'url(' + strangers[i].thumbnail.path + '.jpg)'});
      }
      deferObj.resolve(parsedResults);
    });
    return deferObj.promise;
  };

  // Got to figure out the specifics for the api call. This includes fixing the input from the user to be all lower case and replacing spaces with %20.
  this.getStrangersSpecific = function(userInput) {
    var deferObj = $q.defer();
    $http({
      method: 'GET',
      url: 'https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=663fb1c634171cbd6e99378697d414eb'
    }).then(function(response) {
      var parsedResults = [];
      var strangers = response.data.data.results;
      for (var i = strangers.length - 1; i >= 0; i--) {
        if (strangers[i].thumbnail.path.includes("not") || !strangers[i].description) {
          strangers.splice(i, 1);
          continue;
        }
        parsedResults.unshift({name: strangers[i].name, tag: "He's a maniac on the floor", bio: strangers[i].description, img: 'url(' + strangers[i].thumbnail.path + '.jpg)'});
      }
      deferObj.resolve(parsedResults);
    });
    return deferObj.promise;
  }


  // this.createStranger = function(strangeName, strangeTag, strangeBio, strangeImg) {
  //     strangers.push({name: strangeName, tag: strangeTag, bio: strangeBio, img: strangeImg});
  // };
  //
  // this.createStranger("Michael Schumacher", "Fastest Man Alive", 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', "https://s3-ap-southeast-1.amazonaws.com/s3freebucket/BootstrapScrollSpy/michael_schumacher.jpg");
  //
  // this.createStranger("Zydrunas Savickas", "Strongest Man Alive", "I need to lift more heavy, so I do. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "http://www.theworldsstrongestman.com/wp-content/uploads/2014/07/Zydrunas-Savickas-Super-Yoke-960x640.jpg");
  //
  // this.createStranger('Tom Hardy', "smart guy", 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'https://em.wattpad.com/f1e1a260f5e724ab1afcbfcfe6ac141362996c88/687474703a2f2f737461746963342e627573696e657373696e73696465722e636f6d2f696d6167652f3536636363653763366539376336323230343862393236632f686f772d746f6d2d68617264792d77656e742d66726f6d2d616e2d756e6b6e6f776e2d6163746f722d7374727567676c696e672d776974682d616464696374696f6e2d746f2d616e2d6f736361722d6e6f6d696e65652e6a7067');
  //
  // this.createStranger('Mark Wahlberg', "tough guy", 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'https://www.picsofcelebrities.com/celebrity/mark-wahlberg/pictures/large/best-pictures-of-mark-wahlberg.jpg');
  //
  // this.createStranger('George Washington', "leadr", 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'http://a2.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTIwNjA4NjM0MDA1MzkwODYw.jpg');
  //
  // this.createStranger('Marco Polo', 'exploerer', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'http://www.italymagazine.com/sites/default/files/feature-story/leader/marco-polo.jpg');

});
