// Helpers
// Helper functions and useful variables
// --------------------------------------------------

function helpers() {

    var $ = jQuery;

    var helpers = {

        // Variables
        // --------------------------------------------------

        // Screen widths
        screen_width: {
            xs: 'only screen and (min-width: 480px)',
            sm: 'only screen and (min-width: 768px)',
            md: 'only screen and (min-width: 992px)',
            lg: 'only screen and (min-width: 1200px)',
            xl: 'only screen and (min-width: 1500px)'
        },

        // Custom events
        ev: {
          picturefill_complete: 'picturefill_complete'
        },

        // Utility functions
        // --------------------------------------------------

        // Scroll event throttle
        throttleEvent: function ($el, event, callback, frequency) {

            'use strict';

            // Assign default frequency
            frequency = frequency || 200;

            // Bind to window resize
            $el.on(event, throttle_debounce().throttle(frequency, callback));
        },

        // Scroll event throttle
        debounceEvent: function ($el, event, callback, frequency) {

            'use strict';

            // Assign default frequency
            frequency = frequency || 200;

            // Bind to window resize
            $el.on(event, throttle_debounce().debounce(frequency, callback));
        },

        // Manages the resize or scroll events, takes options to control axis to fire on
        // Also checks against the window dimension to ensure an actual resize has occured (Prevent bug in ie9 where handler is fired on page load)
        manageEvent: function (user_opts) {

            'use strict';

            // Defaults
            var opts = {
                $window: $(window),
                event: 'resize',
                callback: null,
                freq: 200,
                type: 'throttle',
                ev_ns: null
            };

            // Extend with custom options if supplied
            if (user_opts) {
                $.extend(opts, user_opts);

                // Add orientationchange to resize event only
                if (opts.event === 'resize') {
                    opts.event = opts.event + ' orientationchange';
                }
            }

            // Get current dimensions
            var height = opts.$window.outerHeight(),
                width = opts.$window.outerWidth();

            // Checks for and adds a namespace to the event binding
            function createEvent() {

                if (opts.ev_ns) {

                    // Add ns to orientationchange also
                    if(opts.event === 'resize') {
                        return opts.event + '.' + opts.ev_ns + ' orientationchange' + '.' + opts.ev_ns;
                    }

                    return opts.event + '.' + opts.ev_ns;
                }

                return opts.event;
            }

            // Look at supplied axis and check against relevant dimensions
            function manageCallback() {

                // Limit to an axis on resize event if needed
                if (opts.event === 'resize' && opts.axis) {

                    // New height and width
                    var new_height = opts.$window.outerHeight(),
                        new_width = opts.$window.outerWidth();

                    switch (opts.axis) {

                        case 'x':
                            if (width !== new_width) {
                                opts.callback();

                                width = new_width;
                            }

                        break;

                        case 'y':
                            if (height !== new_height) {
                                opts.callback();

                                height = new_height;
                            }

                        break;

                        default:
                            if (width !== new_width || height !== new_height) {
                                opts.callback();

                                width = new_width;
                                height = new_height;
                            }
                    }


                // If not a resize then just fire the callback
                } else {
                   opts.callback(); 
                }
            }

            // Check type of control to use and bind to event
            switch (opts.type) {

                case 'throttle':
                    opts.$window.on(createEvent(), throttle_debounce().throttle(opts.freq, function(){
                        manageCallback();
                    }));

                break;

                case 'debounce':
                    opts.$window.on(createEvent(), throttle_debounce().debounce(opts.freq, function(){
                        manageCallback();
                    }));
            }
        },

        // Check for transition end
        transitionCheck: function ($el, callback) {

            'use strict';

            if (Modernizr.csstransitions) {
                
                // Prevent event firing twice by checking the type of prefix needed for the browser
                // Uses modernizr to check the prefix needed
                // See http://www.iambacon.co.uk/blog/prevent-transitionend-event-firing-twice
                var transEndEventNames = {
                    'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
                    'MozTransition'    : 'transitionend',      // only for FF < 15
                    'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
                },

                transition_props = transEndEventNames[ Modernizr.prefixed('transition') ];

                // Bind to transition end
                $el.one(transition_props, function(e){
                  
                    // Don't let the event bubble!
                    e.stopPropagation();
                    callback();
                    
                }); 

            } else {

                // Run supplied code straight away
                callback();
            }
            
        },

        // Check for animation end
        animationCheck: function ($el, callback) {

            'use strict';

            if (Modernizr.cssanimations) {
                
                // Prevent event firing twice by checking the type of prefix needed for the browser
                // Uses modernizr to check the prefix needed
                // See http://www.iambacon.co.uk/blog/prevent-transitionend-event-firing-twice
                // And https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
                var animations = {
                    "animation"      : "animationend",
                    "OAnimation"     : "oAnimationEnd",
                    "MozAnimation"   : "animationend",
                    "WebkitAnimation": "webkitAnimationEnd"
                },

                animation_props = animations[ Modernizr.prefixed('animation') ];

                // Bind to animationend
                $el.one(animation_props, function(e){

                    // Don't let the event bubble!
                    e.stopPropagation();
                    callback();
                    
                }); 

            } else {

                // Run supplied code straight away
                callback();
            }
            
        },

        // Scroll window to a target position
        scrollWindow: (function(user_opts, callback) {

            'use strict';

            // Defaults
            var opts = {
                target: null,
                offset: 0,
                speed: 1000,
                easing: 'easeOutExpo'
            };

            var $scrolling_el = $('body, html'),
                callback_ran = false; // Flag to work around the double callback firing

            // Extend with custom options if supplied
            if (user_opts) {
                $.extend(opts, user_opts);
            }

            // Ensure callback only fires once
            // Would normally fire twice because we need to animate both the body and html elements
            function fireCallback() {
                
                if(callback && !callback_ran) {

                    callback();

                    callback_ran = true;
                }
            }

            // Get target position
            function targetPosition(target_pos, offset) {

                // If a number is supplied then simply return that value

                // Get position of element if jquery object
                if (target_pos instanceof jQuery) {
                    return Math.round(target_pos.offset().top - offset);
                }

                // Otherwise just return the value
                return target_pos - offset;
            }

            // Allow an interruption of scroll via user input
            function bindScrollInterrupt() {

                // Check for a scroll/key/touch event and stop the animation
                // Lets the user interrupt the animation with manual action
                $scrolling_el.bind('mousedown wheel DOMMouseScroll mousewheel keyup touchstart', function () {

                    // Halt scroll on user action
                    $scrolling_el.stop();

                    // Prematurely fire the callback if the user halts the scroll
                    fireCallback();

                    // Unbind this event straight after
                    $scrolling_el.unbind('wheel mousedown DOMMouseScroll mousewheel keyup touchstart');
                });
            }

            // Animate the scroll
            function performScroll() {

                var calculated_pos = targetPosition(opts.target, opts.offset);

                // Perform animation
                $scrolling_el.stop().animate({
                    scrollTop: calculated_pos
                }, opts.speed, opts.easing, fireCallback);

                // Bind interrupt
                bindScrollInterrupt();
            }

            // Scroll!
            performScroll();

        }),
        
        // Adds namespace to multiple events
        addNamespace: function(events, namespace){

            // Store empty string to concat with
            var compiled_string = '';

            if (events.constructor === Array) {
                $.each(events, function(i){

                    // Add namespace
                    var with_ns = events[i] + namespace + ' ';

                    // Add to existing
                    compiled_string = compiled_string + with_ns;
                });

                // Remove trailing space
                return compiled_string.substring(0, compiled_string.length - 1);
            }
            
            return events + namespace;
        }
    };

    return helpers;

};
