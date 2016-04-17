import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',

  countdownTime: 10,
  radius: 30,
  stroke: 8,

  color: '#6fdb6f',

  widthHeight: Ember.computed('radius','stroke',function(){
    var radius = this.get('radius');
    var stroke =  this.get('stroke');

    return radius * 2 + stroke + 2;
  }),
  circumference: Ember.computed('radius',function(){
    return this.get('radius') * 2 * Math.PI;
  }),

  circlePos: Ember.computed('widthHeight', function(){
    var widthHeight = this.get('widthHeight');
    var pos =  Math.floor((widthHeight / 2));
    return {x:pos,y:pos};
  }),

  init: function () {
    this._super();

  },

  didInsertElement:function(){
    var time = this.get('countdownTime');
    var circumference = Math.ceil(this.get('circumference'));
    var initialOffset = circumference;
    var i = 1;

    var interval = setInterval(() => {

      this.$('.circle_animation').css('stroke-dashoffset', initialOffset - (i * (initialOffset / time)));
      this.$('.center-number').text(i);

      if (i == time) {
        clearInterval(interval);
      }
      i++;
    }, 1000);

    this.$('.circle_animation').css('stroke-dasharray', circumference);
    this.$('.circle_animation').css('stroke-dashoffset', circumference);
    //debugger;
  },
});

