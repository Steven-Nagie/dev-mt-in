angular.module('devMtnSocial').service('strangerService', function() {
  this.strangers = [];

  this.createStranger = function(strangeName, strangeTag, strangeBio, strangeImg) {
      this.strangers.push({name: strangeName, tag: strangeTag, bio: strangeBio, img: strangeImg});
  };

  this.createStranger("Michael Schumacher", "Fastest Man Alive", 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', "https://s3-ap-southeast-1.amazonaws.com/s3freebucket/BootstrapScrollSpy/michael_schumacher.jpg");

  this.createStranger("Zydrunas Savickas", "Strongest Man Alive", "I need to lift more heavy, so I do. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "http://www.theworldsstrongestman.com/wp-content/uploads/2014/07/Zydrunas-Savickas-Super-Yoke-960x640.jpg");

});
