$(document).ready(function() {
  $('#menu-icon').click(function() {
    $('#drop-menu').slideToggle();
  });

  $('#search-icon-find-friends').click(function() {
    $('#slide-menu').slideToggle();
    $('#slide-menu-button').slideToggle();
    $('#search-for-friends').slideToggle();
  });
});
