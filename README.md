# electron-context-menu

[![Publish](https://github.com/fiahfy/electron-context-menu/actions/workflows/publish.yml/badge.svg)](https://github.com/fiahfy/electron-context-menu/actions/workflows/publish.yml)

> Context Menu Helper in Electron Apps.

## Installation

```bash
npm install @fiahfy/electron-context-menu
```

## Usage

```js
// main.js
import { register } from '@fiahfy/electron-context-menu'

const actionCreators = {
  ping: (_event, _params, { message }) => ({
    click: () => console.log(message), // => pong
  }),
}

register(actionCreators)
```

```js
// preload.js
import { exposeOperations } from '@fiahfy/electron-context-menu/preload'

contextBridge.exposeInMainWorld('electronAPI', {
  ...exposeOperations(),
}
```

```js
// renderer.js
import { buildContextMenuParams } from '@fiahfy/electron-context-menu/renderer'

const handleContextMenu = (e) => {
  e.preventDefault()
  e.stopPropagation()

  const items = [
    { type: 'ping', data: { message: 'pong' }}
  ]

  await window.electronAPI.showContextMenu(
    buildContextMenuParams(e, items),
  )
}
```
