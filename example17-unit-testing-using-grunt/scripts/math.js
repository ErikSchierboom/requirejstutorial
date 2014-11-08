// This JavaScript file defines a module without any dependencies on other modules.
// The module returns an object that has one method: add(x, y). Modules that load
// this module get passed a instance of this object.
define(function () {
    return {
        add: function (x, y) {
            return x + y;
        }
    };
});