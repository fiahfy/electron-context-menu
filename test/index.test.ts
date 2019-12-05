import show from '../src'

describe('show', () => {
  test('should call', () => {
    expect(() => {
      show()
    }).not.toThrow(Error)
    expect(() => {
      show([{ role: 'copy' }])
    }).not.toThrow(Error)
    expect(() => {
      show([], { hidden: false })
    }).not.toThrow(Error)
    expect(() => {
      show([], { label: 'foo' })
    }).not.toThrow(Error)
  })
})
