var test = require('prova')
  , ReadmeSection = require('./index.js')

test('ReadmeSection Component: lifecycle functions', function(t){

  var readmeSection = new ReadmeSection()
  t.equal(
    typeof readmeSection
    , 'object'
    , 'creates an object'
  )

  t.end()
})

test('ReadmeSection Component: custom method', function(t){
  var readmeSection = new ReadmeSection()

  t.end()
})
