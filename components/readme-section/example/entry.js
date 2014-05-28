var $ = require('jquery')
  , Backbone = require('backbone')
  , ReadmeSection = require('../index.js')
  , $body = $('body')
  , readmeSection

Backbone.$ = $


// Show us how the ReadmeSection component works
readmeSection = new ReadmeSection({
  el: $body
})
