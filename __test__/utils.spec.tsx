import { sum } from '../src/utils'

describe('sum', () => {
  test('1+1=2', () => {
    expect(sum(1, 1)).toBe(2)
  })
  test('1+1!=3', () => {
    expect(sum(1, 1)).not.toBe(3)
  })
})
