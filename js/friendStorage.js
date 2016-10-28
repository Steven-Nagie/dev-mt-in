angular.module('devMtnSocial').service('friendService', function() {

  this.friends = [];

  this.createFriends = function(friendName, friendTag, friendBio, friendImg) {
      this.friends.push({name: friendName, tag: friendTag, bio: friendBio, img: friendImg});
  };

  this.createFriends('Sally Rally', 'My name is Sally.', 'I left my heart in San Francsico.', 'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=0721657b46ce27df52955f73818ab5b7.jpg');

  this.createFriends('Gregory Isaacs', 'If I don\'t if I don\'t', "I don't know what we're yelling about", 'http://cdn3.pitchfork.com/artists/8438/m.f18e6321.jpg');

  this.createFriends('Mos Def', "One two three", "Mos Def and Talib Kwali, gonna make it on to the tip top, best alliance in hip hop, why-yo", "http://togetherboston.com/wp-content/uploads/Together-2014-Mos-Def.jpg");

  this.createFriends('Ghostface Killah', "Cash rules everything around me", "C.R.E.A.M., get the money, dolla dolla bills y'all", "http://s3.amazonaws.com/hiphopdx-production/2016/02/Ghostface-Killah_02-09-2016.jpg");

  this.createFriends("Meshuggah", "Bleed", "Beams of fire sweep through my head\nThrusts of pain increasingly engaged\nSensory receptors succumb\nI'm no one now, only agony\nMy crimson liquid so frantically spilled\nThe ruby fluid of\nlife unleashed\nRipples ascend to the surface of my eyes\nTheir red pens\ndrawing at random, at will\nA myriad pains begotten in their wake\nThe bastard spawn of a mutinous self", "http://www.metalinjection.net/wp-content/uploads/2015/03/meshuggah28082013.jpg");

  this.createFriends("Blackbeard", "Y'ARRR!", "YYY'AAAAAARRRRRRRRR", "http://mrnussbaum.com/images/blackbeard.jpg");

});
