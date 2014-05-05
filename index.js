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
          }
        })
      return components
  }

  var startServer = function () {
    var components = scanComponents()
    http.createServer(function (req, res) {
      var url = req.url.split('?')[0]
      http.createServer(function (req, res) {

        switch (url) {
          case args.js.alias || args.js.entry:
            js(args.js, responder('javascript', res))
            break

          case args.css.alias || args.css.entry:
            css(args.css, responder('css', res))
            break

          case '/default':
            serveDefaultPage(res, args, lr)
            break

          default:
            if (lr && req.url.substr(-5) === '.html') res.filter = injectLiveReloadScript(lr)
            mount(req, res)
            break
        }

      }).listen(port)
    })
  }

}
