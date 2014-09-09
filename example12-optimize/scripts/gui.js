// This JavaScript file defines a module without any dependencies on other modules.
// The module returns an object that has a single method: 'showMessage()'. Modules
// that load this module get passed a instance of this object.
define(function () {
    return {
        showMessage: function (message) {
            alert(message);
        }
    };
});