window.addEventListener('DOMContentLoaded', function() {

  'use strict';


  // ---


    var message = document.getElementById('message');

    // We're using textContent because inserting content from external sources into your page using innerHTML can be dangerous.
    // https://developer.mozilla.org/Web/API/Element.innerHTML#Security_considerations
    message.textContent = 'message';


});
