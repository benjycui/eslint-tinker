'use strict';

module.exports.traverse = function traverse(node, callbacks) {
  if (callbacks[node.type]) {
    callbacks[node.type](node);
  }

  if (typeof node.children !== 'undefined') {
    for (let i = 0; i < node.children.length; i++) {
      traverse(node.children[i], callbacks);
    }
  }
};

const esTypes = [ 'js', 'javascript', 'node', 'jsx' ];
module.exports.isES = function isES(type) {
  return esTypes.indexOf(type.toLowerCase()) >= 0;
};
