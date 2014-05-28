var Base = require('ribcage-view')

var ComponentList = Base.extend({

  template: require('./template.html.hbs')

, className: 'component-list'

// Custom Methods

// Lifecycle Methods
, afterInit: function () {

  }

, afterRender: function () {

  }

, context: function () {

  }

})

module.exports = ComponentList
