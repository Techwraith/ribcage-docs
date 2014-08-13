#!/usr/bin/env node

var server = require('../')
  , path = require('path')

server(path.join(process.cwd(), process.argv[2]))
