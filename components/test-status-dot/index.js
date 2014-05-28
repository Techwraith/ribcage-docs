var Base = require('ribcage-view')

var TestStatusDot = Base.extend({

  template: require('./template.html.hbs')

, className: 'test-status-dot'

// Custom Methods

// Lifecycle Methods
, afterInit: function () {

  }

, afterRender: function () {

  }

, context: function () {

  }

})

module.exports = TestStatusDot
