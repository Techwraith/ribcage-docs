var marked = require('marked')
  , wrench = require('wrench')
  , js = require('atomify-js')
  , css = require('atomify-css')
  , handlebars = require('handlebars')
  , fs = require('fs')
  , path = require('path')
  , http = require('http')
  , change = require('change-case')
  , _ = require('lodash')

var renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  var ret = ''
  if (level === 1) {
    ret = '<h' + level + '><a name="' + change.pascal(text) + '">'+text+'</a></h' + level + '>'
  } else {
    ret = '<h' + level + '>'+text+'</h'+level+'>'
  }
  return ret
}


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
          , pascal: change.pascal(component)
          , readme: exists(component, 'README.md')
          , example: exists(component, 'example')
          , test: exists(component, 'test.js')
          }
        })
      return components
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

  var sendComponentExampleJS = function (req, res) {
    var components = scanComponents()
      , component = req.url.split('?')[0].split('/')[1]

    if (!exists(component, path.join('example', 'entry.js'))) {
      return res.end('no example')
    }

    var opts = {
      entry: path.join(dir, component, 'example', 'entry.js')
    , debug: true // default: `false`
    }

    js(opts, responder('css', res))
  }

  var sendComponentExampleCSS = function (req, res) {
    var components = scanComponents()
      , component = req.url.split('?')[0].split('/')[1]

    if (!exists(component, path.join('example', 'entry.css'))) {
      return res.end('no example')
    }

    var opts = {
      entry: path.join(dir, component, 'example', 'entry.css')
    , debug: true // default: `false`
    }

    css(opts, responder('css', res))
  }

  var sendComponentExampleHTML = function (req, res) {
    var components = scanComponents()
      , component = req.url.split('?')[0].split('/')[1]

    var src = '<!doctype html><html><head>'
    src += '<meta charset="utf-8">'
    src += '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
    src += '<meta name="viewport" content="initial-scale=1,width=device-width,user-scalable=0,minimal-ui">'
    src += '<title>Example for '+component+'</title>'
    src += '<link rel="stylesheet" href="/'+component+'/example.css">'
    src += '</head><body>'
    src += '<script src="/'+component+'/example.js"></script>'
    src += '</body></html>'

    res.setHeader('Content-Type', 'text/html')
    res.end(src)
  }

  var sendDocs = function (req, res) {
    var components = scanComponents()
      , arr = []
    for (var i in components) {

      var iframe = ''
      if (components[i].example) {
        iframe = '<iframe src="/'+components[i].name+'/example.html" width="100%" height="500"></iframe>'
      }

      if (components[i].readme) {
        components[i].htmlReadme = iframe + marked(read(components[i].name, 'README.md'), {renderer: renderer})
      } else {
        components[i].htmlReadme = '<h1><a name="'+components[i].pascal+'">'+components[i].name+'</a></h1>'+iframe+'<p>No docs written.</p>'
      }
    }

    var template = handlebars.compile(fs.readFileSync(path.join(__dirname, 'index.html.hbs'), 'utf8'))

    var html = template({
      components: components
    })

    res.end(html)
  }

  var sendCSS = function (req, res) {
    var opts = {
      entry: './pages/docs/entry.css'
    , debug: true // default: `false`
    }

    css(opts, responder('css', res))
  }

  var sendJS = function (req, res) {
    var opts = {
      entry: './pages/docs/entry.js'
    , debug: true // default: `false`
    }

    js(opts, responder('css', res))
  }

  var responder = function (type, res) {
    return function (err, src) {
      if (err) console.log(err);

      if (!res.headersSent) res.setHeader('Content-Type', 'text/' + type)
      res.end(src)
    }
  }

  var startServer = function () {
    http.createServer(function (req, res) {
      var url = req.url.split('?')[0]

      if (url == '/docs' || url == '/') {
        return sendDocs(req, res)
      }

      if (url == "/style.css") {
        return sendCSS(req, res)
      }

      if (url == "/site.js") {
        return sendJS(req, res)
      }

      if (url.indexOf('readme.html') > -1) {
        return sendComponentReadme(req, res)
      }

      if (url.indexOf('example.html') > -1) {
        return sendComponentExampleHTML(req, res)
      }

      if (url.indexOf('example.js') > -1) {
        return sendComponentExampleJS(req, res)
      }

      if (url.indexOf('example.css') > -1) {
        return sendComponentExampleCSS(req, res)
      }

    }).listen(9001)
    console.log('Server running. Visit http://localhost:9001/ to see the docs')
  }
  startServer()

}
