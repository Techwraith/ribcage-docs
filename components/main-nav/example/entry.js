var $ = require('jquery')
  , Backbone = require('backbone')
  , MainNav = require('../index.js')
  , $body = $('body')
  , mainNav

Backbone.$ = $


// Show us how the MainNav component works
mainNav = new MainNav({
  el: $body
})
