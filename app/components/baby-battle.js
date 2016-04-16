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

    actions: {
        battleClick: function(type){
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
