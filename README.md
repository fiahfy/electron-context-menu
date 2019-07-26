# @fiahfy/electron-context-menu

> Context menu helper for electron.


## Installation
```
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
