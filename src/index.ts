import { remote, MenuItemConstructorOptions } from 'electron'

const { Menu } = remote

const appendInspectElementMenu = (
  template: MenuItemConstructorOptions[]
): MenuItemConstructorOptions[] => {
  const e = window.event
  if (!e) {
    return template
  }

  if (!(e instanceof MouseEvent)) {
    return template
  }

  const { clientX: x, clientY: y } = e

  if (template.length) {
    template = template.concat([{ type: 'separator' }])
  }

  return template.concat([
    {
      label: 'Inspect Element',
      click: (): void =>
        remote.getCurrentWindow().webContents.inspectElement(x, y)
    }
  ])
}

export default (template: MenuItemConstructorOptions[] = []): void => {
  if (process.env.NODE_ENV !== 'production') {
    template = appendInspectElementMenu(template)
  }

  if (!template.length) {
    return
  }

  Menu.buildFromTemplate(template).popup({
    window: remote.getCurrentWindow()
  })
}
