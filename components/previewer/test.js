var test = require('prova')
  , Previewer = require('./index.js')

test('Previewer Component: lifecycle functions', function(t){

  var previewer = new Previewer()
  t.equal(
    typeof previewer
    , 'object'
    , 'creates an object'
  )

  t.end()
})

test('Previewer Component: custom method', function(t){
  var previewer = new Previewer()

  t.end()
})
