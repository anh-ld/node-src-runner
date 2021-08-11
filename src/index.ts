import vm from 'vm'
import NativeModule from 'module'

type Exports = { [key: string]: any }
type Module = { [key: string]: any }

const FILE_NAME = 'server.js'
const FILE_DIR = '.'
const BASE_DIR = process.cwd()

const compile = (code:string): vm.Script => {
  const wrapper = NativeModule.wrap(code)
  return new vm.Script(wrapper)
}

const requirer = (packageName: string): NodeJS.Require => {
  const nativeRequire = NativeModule.createRequire(BASE_DIR);
  const packagePath = nativeRequire.resolve(packageName, {
    paths: [BASE_DIR]
  });

  return nativeRequire(packagePath);
}

const execute = (code: string): Exports => {
  const exports: Exports = {};
  const module: Module = {};

  const compiledCode = compile(code);
  const compiledWrapper = compiledCode.runInThisContext();

  compiledWrapper(exports, requirer, module, FILE_NAME, FILE_DIR);

  return exports.hasOwnProperty('default') ? exports.default : exports;
}

export default execute;

// TEST (USING NANOID)
// const CODE_STRING = 'var nanoid = require("nanoid").nanoid; var x = { name: nanoid() }; exports.default = x;';

// console.log(execute(CODE_STRING));