'use strict';

const fs = require('fs');
const path = require('path');
const remark = require('remark');
const shjs = require('shelljs');

const utils = require('./utils');
const tmpDir = '/tmp';
const eslint = './node_modules/.bin/eslint --fix';

module.exports = function tinker(filePath, eslintrc) {
  let file = fs.readFileSync(filePath).toString();
  let updatedFlag = false;

  const codes = [];
  const ast = remark.parse(file);
  utils.traverse(ast, {
    code: function(node) {
      if (!!node.lang && utils.isES(node.lang)) {
        codes.push(node.value);
      }
    },
  });

  codes.forEach(function(code) {
    const tmpFile = tmpDir + path.sep + 'eslint-tinker-tmp-' + Date.now();
    fs.writeFileSync(tmpFile, code);

    const cmd = eslint + ' -c ' + eslintrc + ' ' + tmpFile + ' --rule \'eol-last: 0\' > /dev/null';
    shjs.exec(cmd);

    const fixedCode = fs.readFileSync(tmpFile).toString();

    if (fixedCode !== code) {
      file = file.replace(code, fixedCode);
      updatedFlag = true;
    }
    shjs.rm(tmpFile);
  });

  if (updatedFlag) {
    fs.writeFileSync(filePath, file);
    console.log('Errors in ' + filePath + ' had been fixed! XD');
  }
};
