import { remote } from 'electron'

const { Menu } = remote

const appendInspectElementMenu = (template) => {
  if (!window.event) {
    return template
  }

  const { clientX: x, clientY: y } = window.event

  if (template.length) {
    template = template.concat([{ type: 'separator' }])
  }

  return template.concat([
    {
      label: 'Inspect Element',
      click: () => remote.getCurrentWindow().inspectElement(x, y)
    }
  ])
}

export default (template = []) => {
  if (process.env.NODE_ENV !== 'production') {
    template = appendInspectElementMenu(template)
  }

  if (!template.length) {
    return
  }

  Menu.buildFromTemplate(template).popup(remote.getCurrentWindow(), {
    async: true
  })
}
