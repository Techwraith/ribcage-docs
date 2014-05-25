var marked = require('marked')
  , wrench = require('wrench')
  , js = require('atomify-js')
  , css = require('atomify-css')
  , fs = require('fs')
  , path = require('path')
  , http = require('http')
  , _ = require('lodash')

module.exports = function (dir) {

  var exists = function (component, file) {
    var p = path.join(dir, component, file)
    return !!fs.existsSync(p)
  }

  var read = function (component, file) {
    var p = path.join(dir, component, file)
    return fs.readFileSync(p, 'utf8')
  }

  var scanComponents = function () {
    var files = wrench.readdirSyncRecursive(dir)
      , dirs = _.unique(_.map(files, function (file) {
          return file.split('/')[0]
        }))
      , components = _.map(dirs, function (component) {
          return {
            name: component
          , readme: exists(component, 'README.md')
          , example: exists(component, 'example')
          , test: exists(component, 'test.js')
          }
        })
      return components
  }

  var sendComponentsJSON = function (req, res) {
    var components = scanComponents()
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json')
    }
    res.end(JSON.stringify(components, null, 2))
  }

  var sendComponentReadme = function (req, res) {
    var component = req.url.split('?')[0].split('/')[1]
      , html
    if (exits(component, 'README.md')) {
      html = marked(read(component, 'README.md'))
    } else {
      html = '<h1>'+component+'<h1><p>No docs written.</p>'
    }
    res.end(html)
  }

  var sendDocs = function (req, res) {
    var components = scanComponents()
      , arr = []
    for (var i in components) {
      if (components[i].readme) {
        arr.push(marked(read(components[i].name, 'README.md')))
      } else {
        arr.push('<h1>'+components[i].name+'</h1><p>No docs written.</p>')
      }
    }
    res.end(arr.join('<hr/>'))
  }

  var startServer = function () {
    http.createServer(function (req, res) {
      var url = req.url.split('?')[0]

      if (url == '/components.json') {
        return sendComponentsJSON(req, res)
      }

      if (url == '/docs' || url == '/') {
        return sendDocs(req, res)
      }

      if (url.indexOf('readme.html') > -1) {
        return sendComponentReadme(req, res)
      }

      if (url.indexOf('example.html') > -1) {
        //return sendComponentExampleHtml(req, res)
      }

      if (url.indexOf('example.js') > -1) {
        //return sendComponentExampleJs(req, res)
      }

      if (url.indexOf('example.css') > -1) {
        //return sendComponentExampleCss(req, res)
      }

    }).listen(9001)
    console.log('Server running. Visit http://localhost:9001/ to see the docs')
  }
  startServer()

}
