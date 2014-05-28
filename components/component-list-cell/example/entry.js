var $ = require('jquery')
  , Backbone = require('backbone')
  , ComponentListCell = require('../index.js')
  , $body = $('body')
  , componentListCell

Backbone.$ = $


// Show us how the ComponentListCell component works
componentListCell = new ComponentListCell({
  el: $body
})
