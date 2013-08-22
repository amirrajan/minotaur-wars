Tactics.Models.Unit = Backbone.Model.extend({
  meterStyle:function(){
    var max = 100
      , current = parseInt(this.get('hp'),10)
      , percent = current >= max ? 100 : (current/100)*100;

    return 'width:' + percent + '%';
  }
});

Tactics.Collections.UnitCollection = 
  Backbone.Collection.extend({
    model: Tactics.Models.Unit,
    reset: function( units ){
      var parsed = [];
      for(var key in units) {
        var unit = { id:key };
        _.extend(unit, units[key]);
        parsed.push(unit);
      }
      Backbone.Collection.prototype.reset.call(this, parsed);      
    }
  });