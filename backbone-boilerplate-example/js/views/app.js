define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'vm',
  'text!templates/layout.html'
], function($, _, Backbone, config, Vm, layoutTemplate){
  var AppView = Backbone.View.extend({
    el: '.container',
    initialize: function () {
    
    },
    render: function () {

      var that = this;
      $(this.el).html(layoutTemplate);

      require(['views/header/menu'], function (HeaderMenuView) {
        var headerMenuView = Vm.create(that, 'HeaderMenuView', HeaderMenuView);
        headerMenuView.render();
      });
      
      require(['views/footer/footer'], function (FooterView) {
        var footerView = Vm.create(that, 'FooterView', FooterView);
        footerView.render();
      });
    
    }
  });
  return AppView;
});