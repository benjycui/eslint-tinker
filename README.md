# eslint-tinker

[![npm package](https://img.shields.io/npm/v/eslint-tinker.svg?style=flat-square)](https://www.npmjs.org/package/eslint-tinker)
[![NPM downloads](http://img.shields.io/npm/dm/eslint-tinker.svg?style=flat-square)](https://npmjs.org/package/eslint-tinker)
[![Dependency Status](https://david-dm.org/benjycui/eslint-tinker.svg?style=flat-square)](https://david-dm.org/benjycui/eslint-tinker)

To fix ESLint Errors in Markdown(or more in the future) automatically.

## Installation

```bash
npm install --save eslint-tinker
```

## Usage

Edit `package.json`:

```json
{
  "scripts": {
    "eslint-tinker": "eslint-tinker path/to/file.md"
  }
}
```

Then:

```bash
npm run eslint-tinker
```

## Liscense

MIT
