// What class mixitup should check for
var targetSelector = '.mix';

//Check hash, get value
// function getSelectorFromHash() {
//   var hash = window.location.hash.replace(/^#/g, '');
//   var selector = hash ? '.' + hash : targetSelector;
//   $('.checkbox input').each(function(){
//     if( $(this).attr('value') === selector){
//       $(this).prop("checked", true);
//     }
//   });
//   return selector;
// }
function getSelectorFromHash() {
  var hash = window.location.hash.replace(/^#/g, '');
  if (window.location.href.indexOf("[class*") > -1) {
    var selector = decodeURIComponent(hash);
  } else {
    var selector = hash ? '.' + hash : targetSelector;
  }
  $('.checkbox input').each(function() {
    if ($(this).attr('value') === selector) {
      $(this).prop("checked", true);
    }
  });
  return selector;
}
//Checkity check the checkboxes

//set hash on filter change
function setHash(state) {
  var selector = state.activeFilter.selector;
  var newHash = '#' + selector.replace(/^\./g, '');
  if (selector === targetSelector && window.location.hash) {
    history.pushState(null, document.title, window.location.pathname);
  } else if (newHash !== window.location.hash && selector !== targetSelector) {
    // Change the hash
    history.pushState(null, document.title, window.location.pathname + newHash); // or history.replaceState()
  }
  //Infinite Load
  $('.mix-load-more').removeClass('hide');
  if ($('.mix:visible').length < itemLimit) {
    $('.mix-load-more').addClass('hide');
  }
}

var itemLimit = 8;
var loadMoreLimit = 8;

//////////////////////////////////////
// Initialize Mixitup on .container //
//////////////////////////////////////
var mixer = mixitup('.u4m-filtered-content .container', {
  selectors: {
    target: targetSelector
  },
  load: {
    filter: getSelectorFromHash(),
  },
  // Initialize pagination
  pagination: {
    limit: itemLimit
  },
  // Initialize multifiltration
  multifilter: {
    enable: true,
    minSearchLength: 2
  },

  // Initialize callback functions
  callbacks: {
    // Change URL when changing filters
    onMixStart: function(state, futureState) {
      var filterQuery = futureState.activeFilter.selector.replace('.', '').replace(/\./g, '|');
      if (futureState.totalShow < itemLimit) {
        $('.mixitup-page-list').addClass('no-need');
      } else {
        $('.mixitup-page-list').removeClass('no-need');
      }
    },
    // Display a console error when ther are no results
    onMixFail: function(state) {
      console.log('No items found');
    },
    onMixEnd: setHash
  }
});
window.onhashchange = function() {
  var selector = getSelectorFromHash();
  if (selector === mixer.getState().activeFilter.selector) return; // no change
  mixer.filter(selector);
};
// Hide load more when not needed
if ($('.mix:visible').length < itemLimit) {
  $('.mix-load-more').addClass('hide');
}

$('.mix-load-more').click(function() {
  itemLimit += loadMoreLimit;
  mixer.paginate({
    limit: itemLimit
  });

  $('.mix-load-more').removeClass('hide');

  if ($('.mix:visible').length < itemLimit) {
    $('.mix-load-more').addClass('hide');
  }

});

////////////////////////////
// End Initialize Mixitup //
////////////////////////////