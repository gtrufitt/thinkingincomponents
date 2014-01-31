define('success-message', [], function () {
    'use strict';

    function addTo($element) {
        $element.prepend('<p>JQuery and Require.js are good to go.</p>');
    }

    return {
        addTo: addTo
    };
});
