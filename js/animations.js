$(document).ready(function() {
  $('#menu-icon').click(function() {
    $('#drop-menu').slideToggle();
  });

  $('#search-icon-find-friends').click(function() {
    $('#slide-menu').slideToggle();
    $('#slide-menu-button').slideToggle();
    $('#search-for-friends').slideToggle();
  });

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters.charAt(Math.floor(Math.random() * 16));
    }
    return color;
  }

  $('p').click(function() {
    var words = $(this).text().split(' ');

    for (var i = Math.floor(Math.random() * (5 - 1)); i < words.length; i) {
      var random = getRandomColor();
      words[i] = "<span style='color:" + random + "'>" + words[i] +"</span>";
      i += Math.floor(Math.random() * (5 - 1));
    }
    words = words.join(" ");
    $(this).html(words);
  });



});
