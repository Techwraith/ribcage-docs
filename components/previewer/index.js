var Base = require('ribcage-view')

var Previewer = Base.extend({

  template: require('./template.html.hbs')

, className: 'previewer'

// Custom Methods

// Lifecycle Methods
, afterInit: function () {

  }

, afterRender: function () {

  }

, context: function () {

  }

})

module.exports = Previewer
