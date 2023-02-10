#! /usr/bin/env node
const program = require('commander')
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')
// 查看版本号 
program.version(require('./package.json').version, '-v,--version')

// 提示和其他options
helpOptions()

// 创建其他命令
createCommands()

program.parse(process.argv)

const options = program.opts()
// console.log('命令参数：',options)