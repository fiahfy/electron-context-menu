import type { ContextMenuOption, ContextMenuParams } from './index.js'

export type { ContextMenuOption, ContextMenuParams }

export const buildContextMenuParams = (
  e: MouseEvent,
  options: ContextMenuOption[],
): ContextMenuParams => {
  const target = e.target

  const isEditable =
    target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
      ? !target.readOnly
      : false

  const selection = window.getSelection()
  const selectionText = selection
    ? selection.containsNode(target as Node, true)
      ? selection.toString()
      : ''
    : ''

  const { clientX: x, clientY: y } = e

  return { isEditable, options, selectionText, x, y }
}
