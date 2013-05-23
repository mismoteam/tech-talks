define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'config',
  'models/task',
  'text!templates/widgets/loading.html',
  'text!templates/tasks/create.html'
], function($, _, Backbone, Vm, config, taskModel, loadingTemplate, taskCreateTemplate){
  var TaskCreateView = Backbone.View.extend({
    el: '.taskCreate',
    
    events: {
      'click #btn-create' : 'createTask'
    },

    intialize: function () {

    },
    
    render: function () {

      $(this.el).html(taskCreateTemplate);
      
    },

    createTask: function(event){
      var el = this.$el,
          input = $('#input-title'),
          value = input.val(),
          task = new taskModel(),
          listView = Vm.get('TaskListView');

      if(value !== ''){

        //Show the loading template
        el.html(loadingTemplate);

        task.set('title', value);

        el.ajaxStop(function(){

              el.unbind('ajaxStop');

              //Refresh the list
              

              //Show the create input again
              el.html(taskCreateTemplate);

        });

        //create the task
            task.save({}, {
              headers: {
                'Authorization' : 'Bearer ' + config.authToken
              },
              success: function(model, response){
                console.log('Task created id=' + model.get('id'));
              },
              error: function(xhr, response, options){
                alert('Error creating task title=' + value);
              }
            });

      }
      else{
        alert('Task name can\'t be blank');
      }

    }



  });
  return TaskCreateView;
});
