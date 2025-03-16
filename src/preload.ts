import { ipcRenderer } from 'electron'
import type { ContextMenuOption, ContextMenuParams } from './index.js'

export type { ContextMenuOption, ContextMenuParams }

const prefix = 'electron-context-menu.'

export type Operations = {
  showContextMenu: (params: ContextMenuParams) => void
}

export const exposeOperations = (): Operations => {
  return {
    showContextMenu: (params: ContextMenuParams) =>
      ipcRenderer.send(`${prefix}showContextMenu`, params),
  }
}
