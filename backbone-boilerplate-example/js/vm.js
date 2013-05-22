// Use this as a quick template for future modules
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var views = {};

  /**
     * Clean up existing view object if necessary and re-instantiate the view
     * @param context
     * @param name
     * @param View
     * @param options
     * @return {*}
     */
  var create = function (context, name, View, options) {
    
    if(typeof views[name] !== 'undefined') {
      views[name].undelegateEvents();
      if(typeof views[name].clean === 'function') {
        views[name].clean();
      }
    }
    var view = new View(options);
    views[name] = view;
    if(typeof context.children === 'undefined'){
      context.children = {};
      context.children[name] = view;
    } else {
      context.children[name] = view;
    }
    return view;
  };

  /**
     * Call a function from another instantiated view
     *
     * @todo implement parameter passing
     * @param viewName
     * @param funcName
     * @param params
     * @return {*}
     */
    var callFunction = function (viewName, funcName, params) {

        var view = views[viewName],
            func = typeof(view[funcName] === 'function') ? view[funcName] : undefined;
        result = undefined;

        if(view && func ){
            result = func(params);
        }

        return result;

    };
  
  
  return {
    create: create,
    callFunction: callFunction
  };
});
