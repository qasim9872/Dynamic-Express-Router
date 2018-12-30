import Router from "express-promise-router"
import * as fse from "fs-extra"
import { join } from "path"

/* tslint:disable:no-var-requires */
const validate = require("express-validation")

import config from "./config/default.config"
import { IRouteConfig, requestTypes } from "./IRoute.interface"
import { createDebugger } from "./utils/debug"
import { getPath, isObjectEmpty, normalize } from "./utils/helpers"

const debug = createDebugger(__filename)

async function loadRouteFile(name: string, path: string) {
  const routeFile: IRouteConfig = (await import(path)).default

  let handlers = [...routeFile.middlewares]

  if (routeFile.schema && !isObjectEmpty(routeFile.schema)) {
    handlers = handlers.concat(validate(routeFile.schema))
  }

  return {
    name: normalize(name),
    method: routeFile.method,
    handlers: handlers.concat(routeFile.handler)
  }
}

async function loadRoutes(path: string, prefix = ``) {
  const router = Router()

  const files = await fse.readdir(path)

  await Promise.all(
    files.map(async (fileName) => {
      const filePath = join(path, fileName)
      const stats = await fse.lstat(filePath)

      if (stats.isDirectory()) {
        const subRoute = normalize(fileName)
        const subRouter = await loadRoutes(filePath, `${prefix}${subRoute}`)
        router.use(subRoute, subRouter)
      } else {
        const route = await loadRouteFile(fileName, filePath)
        router.route(route.name)[route.method](route.handlers)
        debug(`${route.method}: ${prefix}${route.name}`)
      }
    })
  )

  return router
}

export default async function initialize(
  relativePath = config.DEFAULT_RELATIVE_PATH,
  folderName = config.DEFAULT_FOLDER_NAME
) {
  const fullPath = getPath(relativePath, folderName)
  debug(`path to api folder: ${fullPath}`)

  // Check if folder exists
  const isPath = await fse.pathExists(fullPath)

  if (!isPath) {
    debug(`creating folder: ${folderName} inside ${relativePath}`)
    await fse.ensureDir(fullPath)
  }

  const router = await loadRoutes(fullPath)
  return router
}
