import * as express from "express"
import { getConfig, config } from "./config"
import { createDebugger } from "./utils/debug"
import { join } from "path"
import * as _ from "lodash"
import * as glob from "glob-promise"

const debug = createDebugger("main")

function getGlobPatterns(base: string, patterns: string[] = []) {
    const globPatterns: string[] = []
    for (const pattern of patterns) {
        const filePath = join(base, pattern)
        globPatterns.push(filePath)
    }
    return globPatterns
}

export async function getFileNames(base: string, subPatterns: string[] = []) {
    const patterns = getGlobPatterns(base, subPatterns)

    let fileNames: string[] = []

    for (const pattern of patterns) {
        const fileRoutes = await glob(pattern)
        // merge and ensure no duplicates are present within the routes
        fileNames = _.union(fileNames, fileRoutes)
    }

    return fileNames
}

export async function loadRoutes(config: config, router: express.Router) {
    const routes = await getFileNames(config.baseDir, config.routes)

    debug(routes)
}

export async function routeBoiler(userConfig: config) {
    const config = getConfig(userConfig)

    debug(`config:`, config)

    const router = express.Router()

    // load middlewares

    // load routes
    await loadRoutes(config, router)

    return router
}
