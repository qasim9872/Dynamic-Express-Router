import { methods } from "./supported-methods"
import { getNormalizedRouteName } from "./utils/helper"
import { createDebugger } from "./utils/debug"
import { isFunction, isArray } from "is-what"

const debug = createDebugger(__filename)

interface Route {
    requestType: string
    middlewares?: string[]
    handler?: Function
}

export interface ParsedRoutes {
    routeName: string
    routes: Route[]
}

interface FileStruct {
    [key: string]: any
}

function getRequestTypeFromKey(key: string) {
    const name = key.trim().toLowerCase()

    // Check if method name exists within the key
    let methodEnum = Object.keys(methods).find((method: string) => name.includes(method.toLowerCase()))

    if (!methodEnum) {
        throw new Error(`Method not defined in name: ${key}`)
    }

    return methodEnum.toLowerCase()
}

function parseExportedMember(key: string, exportedMember: any) {
    const requestType = getRequestTypeFromKey(key)

    if (isFunction(exportedMember)) {
        // request handler
        return {
            requestType,
            handler: exportedMember
        }
    } else if (isArray(exportedMember)) {
        // array of middlewares
        return {
            requestType,
            middlewares: exportedMember
        }
    }
}

function parseFileStructure(pathToFile: string, file: any, keys: string[]) {
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

function validateRouteObject(route: any) {
    return isFunction(route.handler) || (isArray(route.middlewares) && route.middlewares.length > 0)
}

function createRoutesFromFileStruct(fileStruct: FileStruct) {
    const routes: Route[] = []

    // Add the routes in the order defined by the enum
    for (const requestType of Object.keys(methods).map(method => method.toLowerCase())) {
        if (fileStruct[requestType] && validateRouteObject(fileStruct[requestType])) {
            const route = {
                requestType,
                ...fileStruct[requestType]
            }
            routes.push(route)
        }
    }

    return routes
}

export default async function parseRouteFile(pathToFile: string, fileName: string): Promise<ParsedRoutes> {
    const file: any = await import(pathToFile)
    debug(`parsing file at path: ${pathToFile}`)

    const routeName = getNormalizedRouteName(fileName)
    debug(`route name: ${routeName}`)

    const keys = Object.keys(file)

    if (keys.length === 0) {
        throw new Error(`The file at path ${pathToFile} has no exported members`)
    }

    const fileStruct = await parseFileStructure(pathToFile, file, keys)

    const routes = createRoutesFromFileStruct(fileStruct)

    return { routeName, routes }
}
