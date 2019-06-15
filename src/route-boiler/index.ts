import * as fse from "fs-extra"
import * as express from "express"
import Router from "express-promise-router"
import { getConfig, UserConfig } from "./config"
import { createDebugger } from "./utils/debug"
import { join } from "path"
import parseFile, { Route } from "./parse-file"

const debug = createDebugger("main")

export async function setRoute(router: any, routeName: string, routes: Route[]): Promise<void> {
    for (const route of routes) {
        router.route(routeName)[route.requestType](route.handler)
    }
}

export async function loadRoutes(pathToFolder: string): Promise<express.Router> {
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
        const routeConfig = await parseFile(filePath, file)
        setRoute(router, routeConfig.routeName, routeConfig.routes)
        // }
    }

    return router
}

export async function routeBoiler(userConfig: UserConfig): Promise<express.Router> {
    const config = getConfig(userConfig)

    debug(`config:`, JSON.stringify(config, null, 2))

    // load middlewares

    // load routes
    const pathToRoutesFolder = join(config.baseDir, config.routes)
    const router = await loadRoutes(pathToRoutesFolder)

    return router
}
