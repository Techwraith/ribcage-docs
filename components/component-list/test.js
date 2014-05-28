var test = require('prova')
  , ComponentList = require('./index.js')

test('ComponentList Component: lifecycle functions', function(t){

  var componentList = new ComponentList()
  t.equal(
    typeof componentList
    , 'object'
    , 'creates an object'
  )

  t.end()
})

test('ComponentList Component: custom method', function(t){
  var componentList = new ComponentList()

  t.end()
})
