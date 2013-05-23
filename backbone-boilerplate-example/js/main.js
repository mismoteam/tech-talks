require.config({

  paths: {
    // Major libraries
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min', 
    backbone: 'libs/backbone/backbone-min', 

    // Require.js text plugin will allow us to load template files without them being 
    // evaluated. This way we can use them for underscore templating.
    text: 'libs/require/text',
    templates: '../templates'
  }

});

require([
  'views/app',
  'router',
  'vm'
], function(AppView, Router, Vm){

  // Create and render main app view
  var appView = Vm.create({}, 'AppView', AppView);
  appView.render();

  // Initialize backbone router
  Router.initialize({appView: appView}); 
  
});