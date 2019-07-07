import chalk from "chalk"
import { Config } from "../config"

const log = console.log

const formatMethod = chalk.keyword("green")

export function logRoute(requestType: string, path: string) {
    log(`${formatMethod(requestType.toUpperCase())}: ${path}`)
}

function checkFileExtension(fileName: string, extensions: string[]) {
    for (const ext of extensions) {
        if (fileName.endsWith(ext)) {
            return true
        }
    }
    return false
}

function nameMatchesFilter(fileName: string, filters: RegExp[]) {
    for (const reg of filters) {
        if (reg.test(fileName)) {
            return true
        }
    }
    return false
}

export function isFileNameAllowed(fileName: string, config: Config) {
    const extensions = config.fileExtensions
    const filters = config.filters

    return checkFileExtension(fileName, extensions) && !nameMatchesFilter(fileName, filters)
}

export function normalizeFileName(name: string): string {
    const cleanName = name.trim().toLowerCase()
    const match = cleanName.match(/(.*)\./)

    const extracted = match ? match[1] : cleanName

    // TODO - remove hyphens?

    return extracted
}

export function getNormalizedRouteName(name: string, customFunction?: any) {
    let routePath = normalizeFileName(name)

    // dynamic path
    if (routePath.startsWith("_")) {
        routePath = routePath.replace("_", ":")
    }

    if (customFunction) {
        routePath = customFunction(routePath)
    }

    // if index file, use the root as base
    if (routePath === "index") {
        routePath = ""
    }

    return `/${routePath}`
}
