import * as fse from "fs-extra"
import * as express from "express"
import Router from "express-promise-router"
import { getConfig, UserConfig } from "./config"
import { createDebugger } from "./utils/debug"
import { join } from "path"
import parseRouteFile, { ParsedRoutes } from "./parse-route"
import parseMiddlewareFile from "./parse-middleware"

const debug = createDebugger("main")

export async function setRoute(
    router: any,
    middlewares: { [key: string]: Function },
    routesConfig: ParsedRoutes
): Promise<void> {
    const routeName = routesConfig.routeName
    const routes = routesConfig.routes
    for (const route of routes) {
        const handlers: Function[] = route.middlewares
            ? route.middlewares.map((name: string) => {
                  const middleware = middlewares[name]
                  if (!middleware) {
                      throw new Error(`cannot find middleware with name: ${name} used in ${routeName}`)
                  }
                  return middleware
              })
            : []

        handlers.push(route.handler)

        router.route(routeName)[route.requestType](handlers)
    }
}

export async function loadRoutes(
    pathToFolder: string,
    middlewares: { [key: string]: Function }
): Promise<express.Router> {
    const router = Router()

    // ensure directory exists
    await fse.ensureDir(pathToFolder)

    const files = await fse.readdir(pathToFolder)

    for (const file of files) {
        const filePath = join(pathToFolder, file)
        // const stats = await fse.lstat(filePath)

        // if (stats.isDirectory()) {
        //     const subRouter = await loadRoutes(filePath)
        // } else {
        const routeConfig = await parseRouteFile(filePath, file)
        setRoute(router, middlewares, routeConfig)
        // }
    }

    return router
}

export async function loadMiddlewares(pathToFolder: string) {
    // ensure directory exists
    await fse.ensureDir(pathToFolder)

    const files = await fse.readdir(pathToFolder)

    const middlewares: { [key: string]: Function } = {}

    for (const file of files) {
        const filePath = join(pathToFolder, file)
        const middleware = await parseMiddlewareFile(filePath, file)

        middlewares[middleware.name] = middleware.middlewareFn
    }

    return middlewares
}

export async function routeBoiler(userConfig: UserConfig): Promise<express.Router> {
    const config = getConfig(userConfig)

    debug(`config:`, JSON.stringify(config, null, 2))

    // load middlewares
    const pathToMiddlewareFolder = join(config.baseDir, config.middlewares)
    const middlewares = await loadMiddlewares(pathToMiddlewareFolder)

    // load routes
    const pathToRoutesFolder = join(config.baseDir, config.routes)
    const router = await loadRoutes(pathToRoutesFolder, middlewares)

    return router
}
