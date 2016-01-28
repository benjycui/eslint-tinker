# eslint-tinker

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
