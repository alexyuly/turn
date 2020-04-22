#!/usr/bin/env node
const path = require("path");
const vm = require("./vm");

vm(require(path.resolve(process.argv[2])));
