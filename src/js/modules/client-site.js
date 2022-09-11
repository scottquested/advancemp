// Show scroll to top when user scrolls 1 hole window length
function openClientSite() {

    // Define jQuery (Wordpress uses no conflict)
    var $ = jQuery;

    var $body = $('body'),
        $iframe = $('.js-client-iframe'),
        $iframe_btn = $('.js-iframe-btn'),

        // State classes
        state = {
            open: 's-client-site-open'
        };

    $iframe_btn.on('click', function(e) {

        e.preventDefault();

        var $this = $(this);

        if($this.attr('href').length > 0 && !$body.hasClass(state.open)) {
            $iframe.attr('src', $this.attr('href'));
            $body.addClass(state.open);

            if($body.hasClass(state.open)) {
                $this.text('Close client site');
            } else {
                $this.text('Open client site');
            }
        } else {
            $body.removeClass(state.open);
            $this.text('Open client site');
        }

    });
}

jQuery(document).ready( function() {
    openClientSite();
});