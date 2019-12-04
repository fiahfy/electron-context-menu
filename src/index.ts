import { remote, MenuItemConstructorOptions } from 'electron'

const { Menu } = remote

const createInspectElementMenuItem = (
  label: string
): MenuItemConstructorOptions => {
  const e = window.event
  if (!(e instanceof MouseEvent)) {
    return template
  }

  const { clientX: x, clientY: y } = e

  return {
    label,
    click: (): void =>
      remote.getCurrentWindow().webContents.inspectElement(x, y)
  }
}

export default (
  template: MenuItemConstructorOptions[] = [],
  { hidden, label }: { hidden: boolean; label: string } = {}
): void => {
  hidden = hidden ?? process.env.NODE_ENV === 'production'
  label = label ?? 'Inspect Element'

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
