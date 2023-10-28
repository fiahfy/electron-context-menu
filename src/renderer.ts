import type { ContextMenuOption, ContextMenuParams } from './index.js'

export type { ContextMenuOption, ContextMenuParams }

export const buildContextMenuParams = (
  e: MouseEvent,
  options: ContextMenuOption[],
): ContextMenuParams => {
  const isEditable =
    e.target instanceof HTMLInputElement ||
    e.target instanceof HTMLTextAreaElement
      ? !e.target.readOnly
      : false
  const selectionText = window.getSelection()?.toString() ?? ''
  const { clientX: x, clientY: y } = e

  return { isEditable, options, selectionText, x, y }
}
