define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'text!templates/tasks/page.html'
], function($, _, Backbone, Vm, taskPageTemplate){
  var TasksView = Backbone.View.extend({
    el: '.page',
    initialize: function () {
    
    },
    render: function () {
      var that = this;
      $(this.el).html(taskPageTemplate);

      require(['views/tasks/list'], function (TaskListView) {
        var taskListView = Vm.create(that, 'TaskListView', TaskListView);
        taskListView.render();
      });
      
      require(['views/tasks/create'], function (TaskCreateView) {
        var taskCreateView = Vm.create(that, 'TaskCreateView', TaskCreateView);
        taskCreateView.render();
      });
    
    }
  });

  return TasksView;

});
