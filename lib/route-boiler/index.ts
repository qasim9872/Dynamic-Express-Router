import * as glob from "glob-promise"
import { join } from "path"

import getConfig from "./config"
import IConfig from "./interfaces/config.interface"

import { createDebugger } from "./utils/debug"
const debug = createDebugger(__filename)

async function routeBoiler(userConfig: IConfig) {
  const config = getConfig(userConfig)
  debug(`Config:`, config)

  // load
}

routeBoiler({
  baseDir: __dirname
})

export default routeBoiler
