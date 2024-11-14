// Form Listener
window.addEventListener('message', function(event) {
  if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {
    $("body").last().addClass("form-submitted");
  }
});

// Copy Footer Links From Main Footer
$(".u4m-footer .links").appendTo(".u4m-landing-page-sign-up .footer-links");