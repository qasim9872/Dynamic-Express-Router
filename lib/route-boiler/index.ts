// import Router from "express-promise-router"
// import { Router } from "express"
// import * as glob from "glob-promise"
// import * as _ from "lodash"
// import { join } from "path"

import getConfig from "./config"
import IConfig from "./interfaces/config.interface"

import { createDebugger } from "./utils/debug"
const debug = createDebugger(__filename)

// function getGlobPatterns(base: string, patterns: string[] = []) {
//   const globPatterns: string[] = []
//   for (const pattern of patterns) {
//     const filePath = join(base, pattern)
//     globPatterns.push(filePath)
//   }
//   return globPatterns
// }

// async function getFilePaths(base: string, patterns: string[] = []) {
//   const globPatterns = getGlobPatterns(base, patterns)

//   let paths: string[] = []
//   for (const pattern of globPatterns) {
//     const fileRoutes = await glob(pattern)
//     // merge and ensure no duplicates are present within the routes
//     paths = _.union(paths, fileRoutes)
//   }

//   return paths
// }

async function routeBoiler(userConfig: IConfig) {
  const config = getConfig(userConfig)
  debug(`Config:`, config)

  // const router = Router()

  // load middlewares

  // load routes

  // return router
}

export default routeBoiler
