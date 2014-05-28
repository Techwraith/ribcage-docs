var Base = require('ribcage-view')

var ReadmeSection = Base.extend({

  template: require('./template.html.hbs')

, className: 'readme-section'

// Custom Methods

// Lifecycle Methods
, afterInit: function () {

  }

, afterRender: function () {

  }

, context: function () {

  }

})

module.exports = ReadmeSection
