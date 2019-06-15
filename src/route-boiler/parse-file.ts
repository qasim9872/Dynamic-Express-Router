import { normalizeFileName } from "./utils/helper"
import { createDebugger } from "./utils/debug"
import { isFunction } from "is-what"

const debug = createDebugger(__filename)

export interface Route {
    requestType: string
    middlewares?: Function[]
    handler: Function
}

export function parseExportedMember(key: string, exportedMember: any) {
    if (isFunction(exportedMember)) {
        // Extract request type from exported function name
        const requestType = key.toLowerCase().replace("handler", "")

        // request handler
        return {
            requestType,
            handler: exportedMember
        }
    }
}

export function parseFileStructure(pathToFile: string, file: any, keys: string[]) {
    const routes: Route[] = []

    for (const key of keys) {
        const exportedMember: any = file[key]

        const parsed = parseExportedMember(key, exportedMember)
        if (parsed) {
            routes.push(parsed)
        } else {
            throw new Error(`Unable to parse file at path ${pathToFile}`)
        }
    }

    return routes
}

export default async function parseFile(pathToFile: string, fileName: string) {
    const file: any = await import(pathToFile)
    debug(`parsing file at path: ${pathToFile}`)

    const routeName = normalizeFileName(fileName)
    debug(`route name: ${routeName}`)

    const keys = Object.keys(file)

    if (keys.length === 0) {
        throw new Error(`The file at path ${pathToFile} has no exported members`)
    }

    const routes = await parseFileStructure(pathToFile, file, keys)

    return { routeName, routes }
}
