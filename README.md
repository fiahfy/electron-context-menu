# electron-context-menu

![badge](https://github.com/fiahfy/electron-context-menu/workflows/Node.js%20Package/badge.svg)

> Context menu helper for electron.

## Installation

```bash
npm install @fiahfy/electron-context-menu
```

## Usage

```js
import show from '@fiahfy/electron-context-menu'

window.addEventListener('contextmenu', () => {
  show([
    {
      label: 'Ping',
      click: () => console.log('pong')
    }
  ])
})
```
