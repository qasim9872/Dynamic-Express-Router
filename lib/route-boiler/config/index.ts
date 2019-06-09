import * as _ from "lodash"
import IConfig from "../interfaces/config.interface"

function getDefaultConfig(): IConfig {
  return {
    baseDir: process.cwd(),
    middlewares: ["middlewares/**/*.ts", "middlewares/**/*.js"],
    routes: ["routes/**/*.ts", "routes/**/*.js"]
  }
}

export default function getConfig(userConfig: IConfig) {
  // Update default config with the user provided configurations
  return _.assign(getDefaultConfig(), userConfig)
}
