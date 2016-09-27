'use strict';

const fs = require('fs');
const path = require('path');
const remark = require('remark');

const utils = require('./utils');
const tmpDir = '/tmp';

module.exports = function tinker(filePath, eslint) {
  fs.readFile(filePath, (err, data) => {
    if (err) return;

    let file = data.toString();
    let updatedFlag = false;

    // Extract ES codes from Markdown.
    const codes = [];
    const ast = remark().parse(file);
    utils.traverse(ast, {
      code(node) {
        if (!!node.lang && utils.isES(node.lang)) {
          codes.push(node.value);
        }
      },
    });

    codes.forEach(function(code) {
      const tmpFile = tmpDir + path.sep + 'eslint-tinker-tmp-' + Date.now();
      fs.writeFileSync(tmpFile, code);

      const fixedCode = eslint.executeOnFiles([ tmpFile ])
              .results.map(fixedFile => {
                return fixedFile.output;
              }).filter(output => {
                return !!output;
              })[0];

      if (fixedCode !== undefined && fixedCode !== code) {
        file = file.replace(code, fixedCode);
        updatedFlag = true;
      }
      fs.unlinkSync(tmpFile);
    });

    if (updatedFlag) {
      fs.writeFile(filePath, file, err => {
        if (err) return;
        console.log('Errors in ' + filePath + ' had been fixed!');
      });
    }
  });
};
