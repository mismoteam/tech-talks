// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    // Major libraries
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min', // https://github.com/amdjs
    backbone: 'libs/backbone/backbone-min', // https://github.com/amdjs
        
    // Require.js plugins
    text: 'libs/require/text',

    // A short cut so we can put our html outside the js dir
    templates: '../templates'
  }

});

// Let's kick off the application

require([
  'views/app',
  'router',
  'vm',
  'config'
], function(AppView, Router, Vm, config){

  var appView = Vm.create({}, 'AppView', AppView);
      appView.render();
      Router.initialize({appView: appView});  // The router now has a copy of all main appview
  
});
