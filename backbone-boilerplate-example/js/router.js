// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'vm'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Pages
      'tasks': 'tasks',
      
      // Default - catch all
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(options){
    var appView = options.appView;
    var router = new AppRouter(options);
    
    router.on('route:tasks', function (actions) {
      require(['views/tasks/page'], function (TasksPage) {
        var tasksPage = Vm.create(appView, 'TasksPage', TasksPage);
        tasksPage.render();
      });
    });

    router.on('route:defaultAction', function (actions) {
      require(['views/dashboard/page'], function (DashboardPage) {
        var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage);
        dashboardPage.render();
      });
    });
    
    Backbone.history.start();
    
  };
  return {
    initialize: initialize
  };
});
