import { ipcMain } from 'electron'
import { describe, expect, test, vi } from 'vitest'
import { ActionCreators, register } from '../src'

vi.mock('electron', () => {
  const ipcMain = {
    handle: vi.fn(),
  }
  return { ipcMain }
})

describe('register', () => {
  test('should work', () => {
    const actionCreators: ActionCreators = {
      ping: (_event, _params, { message }) => ({
        click: () => console.log(message),
      }),
    }
    register(actionCreators)
    expect(ipcMain.handle).toBeCalledTimes(1)
  })
})
