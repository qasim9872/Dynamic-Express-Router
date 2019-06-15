import { normalizeFileName } from "./utils/helper"
import { createDebugger } from "./utils/debug"
import { isFunction, isArray } from "is-what"

const debug = createDebugger(__filename)

export interface Route {
    requestType: string
    middlewares?: string[]
    handler: Function
}

export interface ParsedRoutes {
    routeName: string
    routes: Route[]
}

export interface FileStruct {
    [key: string]: any
}

export function getRequestTypeFromKey(key: string, keyword: string) {
    // Extract request type from key
    return key.toLowerCase().replace(keyword, "")
}

export function parseExportedMember(key: string, exportedMember: any) {
    if (isFunction(exportedMember)) {
        const requestType = getRequestTypeFromKey(key, "handler")

        // request handler
        return {
            requestType,
            handler: exportedMember
        }
    } else if (isArray(exportedMember)) {
        const requestType = getRequestTypeFromKey(key, "middlewares")

        // request handler
        return {
            requestType,
            middlewares: exportedMember
        }
    }
}

export function parseFileStructure(pathToFile: string, file: any, keys: string[]) {
    const fileStruct: FileStruct = {}

    for (const key of keys) {
        const exportedMember: any = file[key]

        const parsed = parseExportedMember(key, exportedMember)

        if (parsed) {
            // routes.push(parsed)
            const requestType = parsed.requestType

            // remove the requestType from parsed object
            delete parsed.requestType

            if (!fileStruct[requestType]) {
                fileStruct[requestType] = parsed
            } else {
                fileStruct[requestType] = {
                    ...fileStruct[requestType],
                    ...parsed
                }
            }
        } else {
            throw new Error(`Unable to parse file at path ${pathToFile}`)
        }
    }

    return fileStruct
}

export function createRoutesFromFileStruct(fileStruct: FileStruct) {
    const routes: Route[] = []

    for (const requestType in fileStruct) {
        const route = {
            requestType,
            ...fileStruct[requestType]
        }
        routes.push(route)
    }

    return routes
}

export default async function parseRouteFile(pathToFile: string, fileName: string): Promise<ParsedRoutes> {
    const file: any = await import(pathToFile)
    debug(`parsing file at path: ${pathToFile}`)

    const routeName = `/${normalizeFileName(fileName)}`
    debug(`route name: ${routeName}`)

    const keys = Object.keys(file)

    if (keys.length === 0) {
        throw new Error(`The file at path ${pathToFile} has no exported members`)
    }

    const fileStruct = await parseFileStructure(pathToFile, file, keys)

    const routes = createRoutesFromFileStruct(fileStruct)

    return { routeName, routes }
}
