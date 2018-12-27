import { extractNameFromPath } from "../../lib/utils/helpers"

describe(`extractNameFromPath('path')`, () => {
  it(`should return file name given path`, () => {
    const filePath = __filename
    const name = extractNameFromPath(filePath)
    expect(name).toBe(`helpers.test`)
  })

  it(`should return argument if it is not a path`, () => {
    const argument = `test`
    const name = extractNameFromPath(argument)
    expect(name).toBe(argument)
  })
})
