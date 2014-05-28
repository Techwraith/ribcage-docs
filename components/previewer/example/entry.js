var $ = require('jquery')
  , Backbone = require('backbone')
  , Previewer = require('../index.js')
  , $body = $('body')
  , previewer

Backbone.$ = $


// Show us how the Previewer component works
previewer = new Previewer({
  el: $body
})
