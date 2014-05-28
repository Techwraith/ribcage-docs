var $ = require('jquery')
  , Backbone = require('backbone')
  , ComponentList = require('../index.js')
  , $body = $('body')
  , componentList

Backbone.$ = $


// Show us how the ComponentList component works
componentList = new ComponentList({
  el: $body
})
