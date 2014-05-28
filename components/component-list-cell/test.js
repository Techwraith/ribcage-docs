var test = require('prova')
  , ComponentListCell = require('./index.js')

test('ComponentListCell Component: lifecycle functions', function(t){

  var componentListCell = new ComponentListCell()
  t.equal(
    typeof componentListCell
    , 'object'
    , 'creates an object'
  )

  t.end()
})

test('ComponentListCell Component: custom method', function(t){
  var componentListCell = new ComponentListCell()

  t.end()
})
