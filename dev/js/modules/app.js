define('app', ['jquery', 'success-message'], function ($, successMessage) {
    'use strict';

    // Use this module as the root of your application's JavaScript

    $(document).ready(function () {
        var $body = $('body');
        successMessage.addTo($body);
    });
});
