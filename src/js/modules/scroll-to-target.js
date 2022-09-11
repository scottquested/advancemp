// Scroll to target
// Scrolls to a target position
// --------------------------------------------------
function scrollToTarget() {

    // Define jQuery (Wordpress uses no conflict)
    var $ = jQuery;

    var $target = $('[data-scroll-target]');

    function init (offset) {

        'use strict';

        var page_scroll_offet = $target.scrollTop() - $target.height(),
            media_list = matchMedia(helpers().screen_width.md);

        var offset_media;

        if(!media_list.matches) {

            offset_media = $('.header-top-bar').height();

            $target.each(function (){

                var $el = $(this),
                    $target = $($el.attr('data-scroll-target'));

                // Scroll to target on click
                $el.on('click', function(){

                    // Use helper function
                    helpers().scrollWindow({
                        target: $target,
                        offset: page_scroll_offet - offset_media + $target.outerHeight()
                    });
                });
            });

        } else {

            $target.each(function (){

                var $el = $(this),
                    $target = $($el.attr('data-scroll-target'));

                // Scroll to target on click
                $el.on('click', function(){

                    // Use helper function
                    helpers().scrollWindow({
                        target: $target,
                        offset: page_scroll_offet + ($target.height() - 20)
                    });
                });
            });
        }
    }

    // Check object exists before init
    if ($target.length) {
        init();
    }
}

// Show scroll to top when user scrolls 1 hole window length
function scrollToTopControl() {

    // Define jQuery (Wordpress uses no conflict)
    var $ = jQuery;

    var $window = $(window),
        $body = $('body'),

        // State classes
        state = {
            open: 's-scroll-to-top'
        };


    $window.scroll(function () {

        if ($window.scrollTop() >= $window.height()) {
            $body.addClass(state.open);
        } else {
            $body.removeClass(state.open);
        }
    });


}

jQuery(document).ready( function() {

    // Run on load
    scrollToTarget();

    scrollToTopControl();

});