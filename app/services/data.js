import Ember from 'ember';

export default Ember.Object.extend({
  stores: Ember.Object.create({}),

  player: null,
  baby: Ember.computed.alias('player.baby'),

  /**
   * Creates a data store and adds it to the service
   * @param storeName
   */
  createStoreIfNotExists: function (storeName) {
    if (!this.get(`stores.${storeName}`)) {
      this.set(`stores.${storeName}`, StoreModel.create({
        content: [],
        storeName: storeName
      }));
    }
  },

  register: function (storeName, model) {
    this.createStoreIfNotExists(storeName);

    var store = this.storeFor(storeName);
    store.incrementProperty('_id_seed');

    model.set('id', store.get('_id_seed'));

    store.addObject(model);
  },

  unregister: function (storeName, model) {
    this.storeFor(storeName).removeObject(model);
  },
  
  storeFor: function (storeName) {
    var store = this.get(`stores.${storeName}`);
    if (!store) {
      throw new Error(`Cannot find store ${storeName} as it has not been registered`);
    }
    return store;
  },
}).create({});

var StoreModel = Ember.ArrayProxy.extend({
  _id_seed: 0,
  storeName: null,
  filterObj: function (filter) {
    var array = [].concat(this.get('content'));
    Object.keys(filter).forEach(function (key) {
      array = array.filterBy(key, filter[key]);
    })
    return array;
  },
  getRandom: function (filter) {
    filter = filter || {};
    var pool = this.filterObj(filter);
    var rng = Math.floor(Math.random() * pool.length);

    return pool.objectAt(rng);
  }
});
