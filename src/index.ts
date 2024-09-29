import {
  BrowserWindow,
  type IpcMainInvokeEvent,
  Menu,
  type MenuItemConstructorOptions,
  ipcMain,
} from 'electron'

export type ContextMenuOption = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: any
  type: string
}

export type ContextMenuParams = {
  isEditable: boolean
  options: ContextMenuOption[]
  selectionText: string
  x: number
  y: number
}

export type ActionCreators = {
  [type in string]: (
    event: IpcMainInvokeEvent,
    params: ContextMenuParams,
    data?: ContextMenuOption['data'],
  ) => MenuItemConstructorOptions | false | undefined
}

const defaultActionCreators: ActionCreators = {
  separator: () => ({ type: 'separator' as const }),
  cut: (_event, params) =>
    params.isEditable && {
      accelerator: 'CmdOrCtrl+X',
      role: 'cut' as const,
    },
  copy: (_event, params) =>
    (params.isEditable || params.selectionText.length > 0) && {
      accelerator: 'CmdOrCtrl+C',
      role: 'copy' as const,
    },
  paste: (_event, params) =>
    params.isEditable && {
      accelerator: 'CmdOrCtrl+V',
      role: 'paste' as const,
    },
  inspectElement: (event, params) => ({
    label: 'Inspect Element',
    click: () => {
      event.sender.inspectElement(params.x, params.y)
      if (event.sender.isDevToolsOpened()) {
        event.sender.devToolsWebContents?.focus()
      }
    },
  }),
}

export const register = (
  actionCreators: ActionCreators,
  defaultActionTypes = [
    'separator',
    'cut',
    'copy',
    'paste',
    'separator',
    'inspectElement',
  ],
) => {
  ipcMain.handle(
    'showContextMenu',
    (event: IpcMainInvokeEvent, params: ContextMenuParams) => {
      const findActionCreator = (type: string) => {
        return { ...actionCreators, ...defaultActionCreators }[type]
      }

      const actions = params.options.map((option) => {
        const creator = findActionCreator(option.type)
        return creator ? creator(event, params, option.data) : undefined
      })

      const defaultActions = defaultActionTypes.map((type) => {
        const creator = findActionCreator(type)
        return creator ? creator(event, params) : undefined
      })

      const template = [...actions, ...defaultActions].filter(
        (a) => a,
      ) as MenuItemConstructorOptions[]

      const menu = Menu.buildFromTemplate(template)
      const window = BrowserWindow.fromWebContents(event.sender)
      window && menu.popup({ window, x: params.x, y: params.y })
    },
  )
}
