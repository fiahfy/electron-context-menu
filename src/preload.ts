import { ipcRenderer } from 'electron'
import type { ContextMenuOption, ContextMenuParams } from '.'

export type { ContextMenuOption, ContextMenuParams }

export type Operations = {
  showContextMenu: (params: ContextMenuParams) => Promise<void>
}

export const exposeOperations = (): Operations => {
  return {
    showContextMenu: (params: ContextMenuParams) =>
      ipcRenderer.invoke('showContextMenu', params),
  }
}
