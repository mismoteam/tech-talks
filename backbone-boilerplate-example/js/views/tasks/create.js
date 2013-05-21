define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tasks/create.html'
], function($, _, Backbone, taskCreateTemplate){
  var TaskCreateView = Backbone.View.extend({
    el: '.taskCreate',
    intialize: function () {

    },
    render: function () {
      $(this.el).html(taskCreateTemplate);
      
    }
  });
  return TaskCreateView;
});
