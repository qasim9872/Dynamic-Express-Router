import * as fse from "fs-extra"
import * as express from "express"
import Router from "express-promise-router"
import { getConfig, UserConfig, Config } from "./config"
import { createDebugger } from "./utils/debug"
import { join } from "path"
import parseRouteFile, { ParsedRoutes } from "./parse-route"
import parseMiddlewareFile from "./parse-middleware"
import { getNormalizedRouteName, logRoute, isFileNameAllowed } from "./utils/helper"

const debug = createDebugger("main")

async function setRoute(
    router: any,
    middlewares: { [key: string]: Function },
    routesConfig: ParsedRoutes,
    path: string
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

        if (route.handler) {
            handlers.push(route.handler)
            // Only log routes with handlers
            logRoute(route.requestType, path + routeName)
        }

        router.route(routeName)[route.requestType](handlers)
    }
}

async function loadRoutes(
    pathToFolder: string,
    middlewares: { [key: string]: Function },
    config: Config,
    path: string = ""
): Promise<express.Router> {
    const router = Router({
        mergeParams: true // fix to allow params to be accessible in child routes
    })

    // ensure directory exists
    await fse.ensureDir(pathToFolder)

    const files = await fse.readdir(pathToFolder)

    for (const file of files) {
        const filePath = join(pathToFolder, file)
        const stats = await fse.lstat(filePath)

        if (stats.isDirectory()) {
            const subRouterPath = getNormalizedRouteName(file)
            const subRouter = await loadRoutes(filePath, middlewares, config, path + subRouterPath)
            router.use(subRouterPath, subRouter)
        } else if (isFileNameAllowed(file, config)) {
            const routeConfig = await parseRouteFile(filePath, file)
            setRoute(router, middlewares, routeConfig, path)
        }
    }

    return router
}

async function loadMiddlewares(pathToFolder: string, config: Config) {
    const middlewares: { [key: string]: Function } = {}

    // only load middlewares if directory exists
    if (await fse.pathExists(pathToFolder)) {
        const files = await fse.readdir(pathToFolder)
        const filteredFiles = files.filter(file => isFileNameAllowed(file, config))

        for (const file of filteredFiles) {
            const filePath = join(pathToFolder, file)
            const middleware = await parseMiddlewareFile(filePath, file)

            middlewares[middleware.name] = middleware.middlewareFn
        }
    }
    return middlewares
}

export async function dynamicRouter(userConfig: UserConfig): Promise<express.Router> {
    const config = getConfig(userConfig)

    debug(`config:`, JSON.stringify(config, null, 2))

    // load middlewares
    const pathToMiddlewareFolder = join(config.baseDir, config.middlewares)
    const middlewares = await loadMiddlewares(pathToMiddlewareFolder, config)

    // load routes
    const pathToRoutesFolder = join(config.baseDir, config.routes)
    const router = await loadRoutes(pathToRoutesFolder, middlewares, config)

    return router
}
