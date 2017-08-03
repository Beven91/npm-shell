/**
 * 名称：Npm 执行工具
 * 日期：2017-08-03
 * 描述：通过代码方式执行Npm命令
 */

var path = require('path')
var child_process = require('child_process');

var run = '@@__run__@@'

function Npm(cwd) {
  this.cwd = cwd || process.cwd()
}

/**
 * 执行Npm start
 */
Npm.prototype.start = function () {
  this[run](['start'])
}

/**
 * 执行Npm install
 */
Npm.prototype.install = function (script) {
  var args = (script || '').split(' ')
  args.unshift('install')
  this[run](args)
}

/**
 * 执行Npm uninstall
 */
Npm.prototype.unInstall = function (script) {
  var args = (script || '').split(' ')
  args.unshift('uninstall')
  this[run](args)
}

/**
 * 执行Npm指定命令
 * @param name 要执行的脚本命令名称
 * @param args 其他参数
 * @param cwd 运行目录
 */
Npm.prototype.run = function (name, args, cwd) {
  args = args || []
  args.unshift(name)
  args.unshift('run')
  this[run](args)
}

/**
 * 执行一个Npm脚本命令
 * @param  {Array} args 参数 
 */
Npm.prototype[run] = function (args, env) {
  var Npm = process.platform === 'win32' ? 'Npm.cmd' : 'Npm'
  return child_process.spawnSync(Npm, args, {
    cwd: this.cwd,
    env: combine(env, process.env),
    stdio: [process.stdin, process.stdout, process.stderr]
  })
}

/**
 * 执行Npm脚本命令
 * Npm xxx
 * @param {String} ...args
 */
Npm.prototype.command = function () {
  var args = Array.prototype.slice.call(arguments);
  var env = undefined;
  if (Object.prototype.toString.call(args[args.length - 1]) === '[object Object]') {
    env = args.pop();
  }
  return this[run](args, env);
}


/**
 * 执行包下指定js文件
 * @param {String} js 要执行的js文件路径
 * @param  {Array} args 参数
 */
Npm.prototype.node = function (js, args, env) {
  args = args || []
  args.unshift(js)
  return child_process.spawnSync('node', args, {
    cwd: this.cwd,
    env: combine(env, process.env),
    stdio: [process.stdin, process.stdout, process.stderr]
  })
}

/**
 * 执行指定命令
 * @param  {String} name 命令名称 例如: node
 * @param  {Array} args 参数
 */
Npm.prototype.exec = function (name, args, env) {
  args = args || []
  name = path.join(this.cwd, 'node_modules/.bin/', name)
  name = process.platform === 'win32' ? name + '.cmd' : name
  child_process.spawnSync(name, args, {
    cwd: this.cwd,
    env: combine(env, process.env),
    stdio: [process.stdin, process.stdout, process.stderr]
  })
}

/**
 * 执行npm publish
 * @param name 要执行的脚本命令名称
 * @param args 其他参数
 * @param cwd 运行目录
 */
Npm.prototype.publish = function () {
  return this.command('publish')
}

function combine(source, target) {
  var keys = Object.keys(target);
  source = source || {};
  keys.forEach(function (key) {
    source[key] = target[key];
  })
  return source;
}

// 公布引用
module.exports = Npm;