describe('Add success message to element', function () {
    'use strict';

    /* NB. This tests implementation instead of behaviour to demonstrate Jasmine's features. */
    var moduleLoaded = false,
        successMessage;

    beforeEach(function() {
        require(['success-message'], function () {
            moduleLoaded = true;
            successMessage = arguments[0];
        });

        waitsFor(function() {
            return moduleLoaded;
        });
    });

    afterEach(function() {
        moduleLoaded = false;
    });

    it('Calls prepend to add a message to the element', function () {
        // Given a mock jquery element
        var $element = { prepend: function () {} };
        spyOn($element, 'prepend');

        // When we add the success message to it
        successMessage.addTo($element);

        // Then we expect prepend to have been called
        expect($element.prepend).toHaveBeenCalled();
        // With a non-empty string
        expect($element.prepend.mostRecentCall.args[0]).toBeDefined();
        expect(typeof $element.prepend.mostRecentCall.args[0]).toEqual('string');
        expect($element.prepend.mostRecentCall.args[0]).not.toEqual('');
    });
});