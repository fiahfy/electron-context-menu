import { remote, MenuItemConstructorOptions } from 'electron'

const { Menu } = remote

const createInspectElementMenuItem = (
  label: string
): MenuItemConstructorOptions | undefined => {
  const e = window.event
  if (!(e instanceof MouseEvent)) {
    return undefined
  }

  const { clientX: x, clientY: y } = e

  return {
    label,
    click: (): void =>
      remote.getCurrentWindow().webContents.inspectElement(x, y)
  }
}

type Options = {
  hidden: boolean
  label: string
}

export default (
  template: MenuItemConstructorOptions[] = [],
  options: Partial<Options> = {}
): void => {
  const { hidden, label } = {
    ...{
      hidden: process.env.NODE_ENV === 'production',
      label: 'Inspect Element'
    },
    ...options
  }

  if (!hidden) {
    const menuItem = createInspectElementMenuItem(label)
    if (menuItem) {
      if (template.length) {
        template = [...template, { type: 'separator' }]
      }
      template = [...template, menuItem]
    }
  }

  if (!template.length) {
    return
  }

  Menu.buildFromTemplate(template).popup({
    window: remote.getCurrentWindow()
  })
}
