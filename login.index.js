// Toggle Function
$('.toggle').click(function(){
  // Switches the Icon
  $(this).children('i').toggleClass('fa-pencil');
  // Switches the forms  
  $('.form').animate({
    height: "toggle",
    'padding-top': 'toggle',
    'padding-bottom': 'toggle',
    opacity: "toggle"
  }, "slow");
});

(function() {
  var button, buttonStyles, materialIcons;

  button = '<a href="../" class="at-button"><i class="material-icons">link</i></a>';

  document.body.innerHTML += button;

}).call(this);