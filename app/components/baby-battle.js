import Ember from 'ember';
/**
 * Passed in properties:
 * Baby: Our Baby
 * Opponent: The other baby
 **/
export default Ember.Component.extend({

    init:function(){
        this._super();
        var timer = setInterval(() => {
            this.battleTick();
        }, 100);

        this.set('timer',timer);
    },

    battleTick: function() {
        var baby = this.get('baby');
        var opponent = this.get('opponent');

        baby.battleTick();
        opponent.battleTick();
    },

    babyMusclePercentage: Ember.computed('baby.muscleAttackFatigue', function(){
        return Math.ceil(this.get('baby.muscleAttackFatigue') * 100);
    }),
    babyMagicPercentage: Ember.computed('baby.magicAttackFatigue', function(){
        return Math.ceil(this.get('baby.magicAttackFatigue') * 100);
    }),
    babyCharismaPercentage: Ember.computed('baby.charismaAttackFatigue', function(){
        return Math.ceil(this.get('baby.charismaAttackFatigue') * 100);
    }),

    actions: {
        battleClick: function(type,b,c){
            var baby = this.get('baby');


            if(type === 'muscle') {
                baby.muscleAttack();
            } else if(type === 'charisma') {
                baby.charismaAttack();
            } else if(type === 'magic') {
                baby.magicAttack();
            }
        }
    }
});
