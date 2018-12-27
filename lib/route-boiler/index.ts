import Router from "express-promise-router"
import { join } from "path"
import * as fse from "fs-extra"

import config from "./config/default.config"
import { getPath, normalize } from "./utils/helpers"
import { createDebugger } from "./utils/debug"
import { IRoute, requestTypes } from "./IRoute.interface"

const debug = createDebugger(__filename)

async function loadRouteFile(name: string, path: string): Promise<IRoute> {
  const routeFile = await import(path)

  return {
    name: normalize(name),
    requestType: requestTypes.GET,
    handler: routeFile.default,
  }
}

async function loadRoutes(path: string, prefix = ``) {
  const router = Router()

  const files = await fse.readdir(path)

  files.forEach(async (fileName, index) => {
    const filePath = join(path, fileName)
    const stats = await fse.lstat(filePath)

    if (stats.isDirectory()) {
      const subRoute = normalize(fileName)
      const subRouter = await loadRoutes(filePath, `${prefix}${subRoute}`)
      router.use(subRoute, subRouter)
    } else {
      const route = await loadRouteFile(fileName, filePath)
      router.route(route.name)[route.requestType](route.handler)
      debug(`${route.requestType}: ${prefix}${route.name}`)
    }
  })

  return router
}

export default async function initialize(
  relativePath = config.DEFAULT_RELATIVE_PATH,
  folderName = config.DEFAULT_FOLDER_NAME,
) {
  const fullPath = getPath(relativePath, folderName)
  debug(`path to api folder: ${fullPath}`)

  // Check if folder exists
  const isPath = await fse.pathExists(fullPath)

  if (!isPath) {
    debug(`creating folder: ${folderName} inside ${relativePath}`)
    await fse.ensureDir(fullPath)
  }

  // read directory contents
  const router = await loadRoutes(fullPath)
  // debug(JSON.stringify(router.stack, null, 2))
  // debug(
  //   router.stack // registered routes
  //     .filter((r) => r.route) // take out all the middleware
  //     .map((r) => r.route.path), // get all the paths
  // )
  return router
}
