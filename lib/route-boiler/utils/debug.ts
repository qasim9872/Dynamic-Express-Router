import * as debug from "debug"
import { extractNameFromPath } from "./helpers"

export function createDebugger(filePath: string) {
  const name = extractNameFromPath(filePath)
  return debug(`route-boiler:${name}`)
}
