import { open } from '../src'

describe('open', () => {
  test('should call', () => {
    expect(() => {
      open()
    }).not.toThrow(Error)
    expect(() => {
      open([{ role: 'copy' }])
    }).not.toThrow(Error)
    expect(() => {
      open([], { hidden: false })
    }).not.toThrow(Error)
    expect(() => {
      open([], { label: 'foo' })
    }).not.toThrow(Error)
  })
})
