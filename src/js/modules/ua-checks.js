// User agent checking
// For times when sniffing is nessesary
// --------------------------------------------------
(function() {

    // UA tests
    // --------------------------------------------------
    tests = {
        ipad: navigator.userAgent.match(/iPad/i) !== null,
        iphone: (navigator.userAgent.match(/iPhone/i) !== null) || (navigator.userAgent.match(/iPod/i) !== null),
        IOS_version: false,
        IOS8: false,
        IOS7: false
    };

    // Get IOS version
    // --------------------------------------------------
    function getIOSVersion() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);

            // Store value
            tests.IOS_version = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
    }

    // If it's an ipad then it's not a iphone..
    if (tests.ipad) {
        tests.iphone = false;
    }

    // Get IOS version if it's an idevice
    if (tests.ipad || tests.iphone) {

        // Run test
        getIOSVersion();

        // Set IOS8 var also
        if (tests.IOS_version && tests.IOS_version[0] === 8) {
            tests.IOS8 = true;
        }

        if (tests.IOS_version && tests.IOS_version[0] === 7) {
            tests.IOS7 = true;
        }
    }

    return tests;

});