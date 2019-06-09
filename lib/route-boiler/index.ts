import * as glob from "glob-promise"
import * as _ from "lodash"
import { join } from "path"

import getConfig from "./config/default.config"
import IConfig from "./interfaces/config.interface"
import { createDebugger } from "./utils/debug"
const debug = createDebugger(__filename)

export default class RouteBoiler {
  private config: IConfig
  private routes?: string[]

  constructor(userConfig: IConfig) {
    debug(`Object initialised with config:`, userConfig)
    const config = getConfig()
    // Update default config with the user provided configurations
    _.assign(config, userConfig)

    this.config = config
    debug(`Config:`, config)
  }

  public async getRouter() {
    await this.loadRouteFiles()
  }

  private getPatterns(): string[] {
    const apiPaths = this.config.api || []
    const patterns: string[] = []
    for (const path of apiPaths) {
      const pattern = join(this.config.sourceDir, path)
      patterns.push(pattern)
    }
    return patterns
  }

  private async loadRouteFiles() {
    const patterns = this.getPatterns()
    let routes: string[] = []

    for (const pattern of patterns) {
      const fileRoutes = await glob(pattern)
      // merge and ensure no duplicates are present within the routes
      routes = _.union(routes, fileRoutes)
    }

    debug(`List of route files`)
    debug(routes)
    this.routes = routes
  }
}
