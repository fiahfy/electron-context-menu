# electron-context-menu

![badge](https://github.com/fiahfy/electron-context-menu/workflows/Node.js%20Package/badge.svg)

> Context menu helper for debugging on electron.

## Installation

```bash
npm install @fiahfy/electron-context-menu
```

## Usage

```js
import { open } from '@fiahfy/electron-context-menu'

window.addEventListener('contextmenu', () => {
  open([
    {
      label: 'Ping',
      click: () => console.log('pong'),
    },
  ])
})
```

## API

### open(template, options)

Open contextmenu with the inspect element menu.

#### template

Type: `MenuItemConstructorOptions[]`

The menu item template.

#### options

Type: `Object`

##### hidden

Type: `boolean`  
Default: `process.env.NODE_ENV === 'production'`

Show or hide the inspect element menu.

##### label

Type: `string`  
Default: `Inspect Element`

The inspect element menu label.
