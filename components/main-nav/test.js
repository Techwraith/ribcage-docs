var test = require('prova')
  , MainNav = require('./index.js')

test('MainNav Component: lifecycle functions', function(t){

  var mainNav = new MainNav()
  t.equal(
    typeof mainNav
    , 'object'
    , 'creates an object'
  )

  t.end()
})

test('MainNav Component: custom method', function(t){
  var mainNav = new MainNav()

  t.end()
})
