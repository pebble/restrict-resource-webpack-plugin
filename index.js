function RestrictResourcePlugin(resourceRegExp, message) {
    this.resourceRegExp = resourceRegExp;
    this.message = message;
}

module.exports = RestrictResourcePlugin;

RestrictResourcePlugin.prototype.apply = function(compiler) {
    var resourceRegExp = this.resourceRegExp;
    var message = this.message;

    compiler.plugin("normal-module-factory", function(nmf) {
        nmf.plugin("before-resolve", function(result, callback) {
            if(!result) return callback();
            if(resourceRegExp.test(result.request)) {
                return callback(new Error(message));
            }
            return callback(null, result);
        });
    });
};
